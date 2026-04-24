import express from 'express';
import { ticketRouter, reportRouter, kbRouter, homeRouter } from './routes/index.js';
import { addTimestamp, errorHandler } from './middlewares/index.js';
import { conn } from './config/index.js';
import logger from './utils/logger.js';
import swaggerDocs from './utils/swagger.js';

// create express app
const app = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(addTimestamp);

// routes
app.use("/", homeRouter);
app.use("/tickets", ticketRouter);
app.use("/reports", reportRouter);
app.use("/kb", kbRouter);

// error handling middleware
app.use(errorHandler)

// wait for db, then start the server
const startServer = async () => {
  try {
    await conn();
  } catch (error) {
    logger.error('Failed to connect to the database:', error);
    process.exit(1);
  }
  
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);

    swaggerDocs(app, port);
  });
};

startServer();

export default app;