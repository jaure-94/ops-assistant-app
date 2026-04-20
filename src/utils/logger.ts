import winston from 'winston';

// Vercel and most cloud providers set specific environment variables
const isVercel = process.env.VERCEL === '1';
const isDev = process.env.NODE_ENV === 'development';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    // This satisfies your logging requirement in ALL environments
    new winston.transports.Console(),
  ],
});

/**
 * ONLY add file logging if we are explicitly in Development 
 * AND not on the Vercel platform.
 */
if (isDev && !isVercel) {
  try {
    logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
    logger.add(new winston.transports.File({ filename: 'logs/combined.log' }));
  } catch (err) {
    // Silent fail for file logging to prevent the entire app from crashing
    console.warn("Could not initialize file logging, falling back to console only.");
  }
}

export default logger;