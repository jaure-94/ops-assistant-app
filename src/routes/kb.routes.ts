import { Router } from 'express';
import { createKBEntry } from '../controllers/kb.controller.js';

export const router = Router();

// One route to rule them all: handles both new entries and updates
router.post('/', createKBEntry);
