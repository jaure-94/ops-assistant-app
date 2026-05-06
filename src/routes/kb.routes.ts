import { Router } from 'express';
import { createKBEntry } from '../controllers/kb.controller.js';

export const router = Router();

/**
 * @openapi
 * /kb:
 *   post:
 *     tags:
 *       - Knowledge Base
 *     description: Create a new knowledge base entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/KnowledgeBase'
 *     responses:
 *       201:
 *         description: Knowledge base entry created successfully
 */
router.post('/', createKBEntry);
