import { Router } from 'express';
import { getLandingPage } from '../controllers/home.controller.js';

export const router = Router();

router.get('/', getLandingPage);
