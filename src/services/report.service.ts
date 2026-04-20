import { Ticket, KnowledgeBase } from '../models/index.js';
import { Sequelize, Op } from 'sequelize';

export const getDailySummary = async () => {
  // 1. Ticket volume by category
  type CategoryCountRow = { category: string | null; count: string };
  const volumeByCategory = (await Ticket.findAll({
    attributes: [
      'category',
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
    ],
    group: ['category'],
    raw: true
  })) as unknown as Array<CategoryCountRow>;

  const volumeByCategoryNumeric = volumeByCategory.map(row => ({
    ...row,
    count: Number(row.count)
  }));

  // 2. Top recurring issues (from Knowledge Base usage)
  const recurringIssues = await KnowledgeBase.findAll({
    attributes: ['pattern', 'usage_count'],
    order: [['usage_count', 'DESC']],
    limit: 5,
    raw: true
  });

  // 3. Simple Anomaly Detection (e.g., tickets created in the last hour)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentSpike = await Ticket.count({
    where: Sequelize.where(Sequelize.col('created_at'), Op.gt, oneHourAgo)
  });

  return {
    timestamp: new Date(),
    stats: volumeByCategoryNumeric,
    topIssues: recurringIssues,
    alerts: {
      recentHourlyVolume: recentSpike,
      isAnomaly: recentSpike > 10
    },
    averageResponseTime: "2.4 minutes (simulated)" 
  };
};