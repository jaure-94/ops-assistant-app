import { Router } from "express";
import { getAllTickets, getTicketById, createTicket } from "../controllers/ticket.controller.js";

export const router = Router();

/**
 * @openapi
 * /tickets:
 *  get:
 *    tags:
 *      - Tickets
 *    description: Retrieve all tickets
 *    responses:
 *      200:
 *        description: A list of all tickets
 */

router.get("/", getAllTickets);

/**
 * @openapi
 * /tickets/{id}:
 *  get:
 *    tags:
 *      - Ticket
 *    description: Retrieve a specific ticket by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: A single ticket
 *      404:
 *        description: Ticket not found
 */
router.get("/:id", getTicketById);

/**
 * @openapi
 * /tickets:
 *  post:
 *    tags:
 *      - Create Ticket
 *    description: Creates a new ticket
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Ticket'
 *    responses:
 *      201:
 *        description: Ticket created successfully
 */
router.post("/", createTicket);