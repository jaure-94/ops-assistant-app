import { Router } from "express";
import { getAllTickets, getTicketById, createTicket } from "../controllers/ticket.controller.js";

export const router = Router();

/**
 * GET /tickets
 * Retrieves all tickets
 */
router.get("/", getAllTickets);

/**
 * GET /tickets/:id
 * Retrieves a specific ticket by ID
 */
router.get("/:id", getTicketById);

/**
 * POST /tickets
 * Creates a new ticket
 */
router.post("/", createTicket);