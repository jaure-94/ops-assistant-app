import type { Request, Response } from 'express';
import { KnowledgeBase } from '../models/index.js';
import logger from '../utils/logger.js';

export const createKBEntry = async (req: Request, res: Response) => {
  try {
    const { pattern, category, priority, suggested_response } = req.body;

    // Basic Validation
    if (!pattern || !category) {
      return res.status(400).json({ success: false, message: "Pattern and Category are required" });
    }

    // Standardize input for consistent matching
    const normalizedPattern = pattern.toLowerCase().trim();

    // The 'Upsert' logic: Find it or Create it
    const [entry, created] = await KnowledgeBase.findOrCreate({
      where: { pattern: normalizedPattern },
      defaults: {
        pattern: normalizedPattern,
        category,
        priority: priority || 'Medium',
        suggested_response,
        usage_count: 0
      }
    });

    // If it already existed, update it with the new info
    if (!created) {
      await entry.update({
        category,
        priority: priority || entry.priority,
        suggested_response: suggested_response || entry.suggested_response
      });
    }

    res.status(created ? 201 : 200).json({
      success: true,
      message: created ? "New pattern added to KB" : "Existing pattern updated",
      data: entry
    });
    logger.info(`${created ? "Created" : "Updated"} KB entry for pattern: "${normalizedPattern}"`);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
    logger.error("Error in createKBEntry:", error);
  }
};