import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

// Set up a connection to the PostgreSQL database using Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Disable logging for cleaner output 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, 
    idle: 10000
  },
  dialectOptions: {
    // SSL required for most cloud-hosted PostgreSQL instances
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

// Test the database connection
export const conn = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    // This is what actually triggers the table creation logic
    await import('../models/index.js');

    // sync models in development mode only to avoid accidental data loss in production
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      logger.info('📂 Database schemas synchronized.');
    }
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process with an error code
  }
};

export default sequelize;