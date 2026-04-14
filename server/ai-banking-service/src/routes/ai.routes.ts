import { Router } from 'express';
import { onboardingChat } from '../controllers/AIChatController';

const router = Router();

// /api/v1 is prefixed in server.ts
router.post('/ai/onboarding', onboardingChat);

export default router;
