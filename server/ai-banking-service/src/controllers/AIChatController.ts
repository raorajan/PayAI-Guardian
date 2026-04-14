import { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const onboardingChat = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, message: 'Invalid messages format' });
    }

    const systemPrompt = `
      You are the PayAI Guardian Help Assistant. Your persona is a "Smart Onboarding Buddy" for first-time users.
      
      CORE PRINCIPLES:
      1. Proactive & Helpful: You guide users through the platform's features (AI Fraud Protection, Blockchain Auditing, Real-time Banking).
      2. Trustworthy: You address security concerns instantly with bank-grade confidence.
      3. Concise: Keep answers under 3-4 sentences unless explaining a complex feature.
      4. Action-Oriented: Always suggest a next step, like "Try the demo" or "Link a sandbox account".
      
      KNOWLEDGE BASE:
      - Security: Bank-grade encryption, Plaid integration (read-only), Blockchain audit trails.
      - Fraud Protection: Scans transactions in <100ms, 97% accuracy.
      - Real Banking: We use Plaid and Stripe, but the demo is 100% free with fake money.
      
      TONE: Professional yet friendly and approachable.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiMessage = response.choices[0].message;

    res.json({
      success: true,
      message: aiMessage.content,
    });
  } catch (error: any) {
    console.error('OpenAI Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'AI Service currently busy. Please try again later.',
    });
  }
};
