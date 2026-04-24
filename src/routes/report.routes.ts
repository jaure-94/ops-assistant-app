import { Router } from 'express';
import { getDailyReport } from '../controllers/report.controller.js';

export const router = Router();

/**
 * @openapi
 * /reports/daily:
 *   get:
 *     tags:
 *       - Reports
 *     description: Retrieve daily report
 *     responses:
 *       200:
 *         description: Daily report retrieved successfully
 */
router.get('/daily', getDailyReport);
