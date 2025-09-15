import { Router } from 'express';
import { getSuggestions } from '../services/geminiService.js';

const router = Router();

/**
 * POST /api/chat
 * body: { section: 'health'|'agriculture'|'climate', uvIndex: number, locationName?: string, message?: string }
 */
router.post('/', async (req, res) => {
  try {
    const { section, uvIndex, locationName, message } = req.body;
    if (!['health', 'agriculture', 'climate'].includes(section)) {
      return res.status(400).json({ error: 'invalid section' });
    }
    const text = await getSuggestions({ section, uvIndex, locationName, message });
    res.json({ ok: true, text });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
