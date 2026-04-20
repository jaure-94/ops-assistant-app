// src/models/index.ts
import sequelize from '../config/db.js';
import Ticket from './Ticket.model.js';
import KnowledgeBase from './KnowledgeBase.model.js';
import type { InferCreationAttributes } from 'sequelize';

export { sequelize, Ticket, KnowledgeBase };

// Type for incoming ticket data (creation payload)
export type TicketInput = InferCreationAttributes<Ticket>;