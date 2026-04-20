import type { Request, Response } from 'express';
import { Ticket } from '../models/index.js';
import logger from '../utils/logger.js';
import { processTicketTriage } from '../services/index.js';
/**
 * GET /tickets
 * Retrieve all tickets
 */
export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json({
      message: "List of tickets",
      data: tickets,
      timestamp: req.timestamp,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch tickets",
      details: error.message,
    });
  }
};

/**
 * GET /tickets/:id
 * Retrieves a single ticket by ID
 */
export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticketId = Array.isArray(id) ? id[0] : id; // Handle potential array
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({
        error: "Ticket not found",
        id,
      });
    }

    res.status(200).json({
      message: `Details of ticket with ID: ${id}`,
      data: ticket,
      timestamp: req.timestamp,
    });

    logger.info(`📄 Fetched ticket with ID: ${id}`);
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch ticket",
      details: error.message,
    });
    logger.error(`🔴 Error fetching ticket with ID: ${req.params.id}:`, error);
  }
};

/**
 * POST /tickets
 * Creates a new ticket with validation
 */
export const createTicket = async (req: Request, res: Response) => {
  try {
    const { title, description, user, external_timestamp } = req.body;

    // 1. Validate required fields
    if (!title || !description || !user) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["title", "description", "user"],
      });
      logger.warn("⚠️ Validation failed: Missing required fields", { body: req.body });
    }

    // 2. Validate field constraints (matching Ticket.model.ts constraints)
    if (typeof title !== 'string' || title.length < 5 || title.length > 255) {
      return res.status(400).json({
        error: "Title must be between 5 and 255 characters",
      });
    }

    if (typeof description !== 'string' || description.length === 0) {
      return res.status(400).json({
        error: "Description is required and must be a string",
      });
    }

    if (typeof user !== 'string' || !user.includes('@')) {
      return res.status(400).json({
        error: "User must be a valid email address",
      });
    }

    // 3. Create ticket in the database
    const newTicket = await Ticket.create({
      title: title.trim(),
      description,
      user,
      status: 'pending'
    });
    logger.info(`🆕 New ticket created with ID: ${newTicket.id}`);

    /**
     * 3. Trigger Triage (Background Process)
     * We don't 'await' this because we want to respond to the user immediately.
     */
    processTicketTriage(newTicket.id).catch(err => {
      logger.error(`🔴 Triage background error for Ticket ${newTicket.id}:`, err);
    });

    // 4. Respond to client
    res.status(201).json({
      success: true,
      message: "Ticket received and queued for processing",
      data: newTicket.toJSON()
    });
    logger.info(`✅ Responded to client for ticket ID: ${newTicket.id}`);

  } catch (error: any) {
    res.status(500).json({
      error: "Failed to create ticket",
      details: error.message || "Invalid request",
    });
    logger.error("🔴 Error in createTicket controller:", error);
  }
};