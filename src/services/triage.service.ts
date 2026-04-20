import { GoogleGenerativeAI, SchemaType, type ResponseSchema } from "@google/generative-ai";
import { Ticket, KnowledgeBase } from '../models/index.js';
import logger from "../utils/logger.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Define a strict response schema. This ensures Gemini's response is structured and can be directly used to update the ticket.
 */
const schema: ResponseSchema = {
  description: "Ticket classification result",
  type: SchemaType.OBJECT,
  properties: {
    category: {
      type: SchemaType.STRING,
      description: "IT, HR, Access, Payroll, or Other",
      nullable: false,
    },
    priority: {
      type: SchemaType.STRING,
      description: "Low, Medium, or High",
      nullable: false,
    },
    suggested_response: {
      type: SchemaType.STRING,
      description: "A short, helpful response for the user",
      nullable: false,
    },
  },
  required: ["category", "priority", "suggested_response"],
};

// AI model to be used for triage processing.
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    // generationConfig: {
    //   responseMimeType: "application/json",
    //   responseSchema: schema,
    // },
  },
  {
    apiVersion: "v1beta",
  }
);

export const processTicketTriage = async (ticketId: string) => {
  const ticket = await Ticket.findByPk(ticketId);
  if (!ticket) return;

  const title = ticket.title.toLowerCase();

  // Fetch all and find a match in the string
  const allKB = await KnowledgeBase.findAll();
  const match = allKB.find(kb => title.includes(kb.pattern.toLowerCase()));

  // STEP 1: Knowledge Base Check (The "Cache")
  // Using a keyword match
  
  if (match) {
    logger.info("✅ Using Knowledge Base");
    await ticket.update({
      category: match.category,
      priority: match.priority,
      suggested_response: match.suggested_response,
      status: 'triaged_kb'
    });
    await match.increment('usage_count');
    return;
  }

  // STEP 2: Gemini AI Fallback
  logger.info("🤖 Knowledge Base missed. Calling Gemini...");
  await triageWithGemini(ticket);
};

async function triageWithGemini(ticket: any) {
  const prompt = `
    You are a support ticket classifier. Respond ONLY with a raw JSON object. 
    No markdown, no backticks, no preamble.
    
    Ticket Title: ${ticket.title}
    Ticket Description: ${ticket.description}

    JSON Format:
    {
      "category": "IT" | "HR" | "Access" | "Payroll" | "Other",
      "priority": "Low" | "Medium" | "High",
      "suggested_response": "short, helpful and informative ticket response to the user"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    // Clean the output (removes ```json blocks if Gemini adds them)
    const cleanedText = responseText.replace(/```json|```/g, "").trim();
    const response = JSON.parse(cleanedText);

    await ticket.update({
      category: response.category,
      priority: response.priority,
      suggested_response: response.suggested_response,
      status: 'triaged_ai'
    });

    logger.info("✨ Gemini Triage Successful");
  } catch (error) {
    logger.error("Gemini Triage Error:", error);
    await ticket.update({ status: 'failed_triage' });
  }
}