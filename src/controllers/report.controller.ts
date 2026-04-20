import type { Request, Response } from 'express';
import * as ReportService from '../services/report.service.js';
import logger from '../utils/logger.js';

export const getDailyReport = async (req: Request, res: Response) => {
  try {
    const report = await ReportService.getDailySummary();
    res.json({
      success: true,
      data: report
    });
    logger.info("📊 Daily report generated successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to generate report" });
    logger.error("Error generating daily report:", error);
  }
};