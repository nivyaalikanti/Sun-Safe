import { Router } from 'express';
import { upsertSubscriber } from '../services/storage.js';
import { sendSMS } from '../services/twilioService.js';

const router = Router();

router.post('/subscribe', async (req, res) => {
  try {
    const { phone, lat, lng } = req.body;
    if (!phone || typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'phone, lat, lng required' });
    }
    await upsertSubscriber({ phone, lat, lng });
    await sendSMS(phone, '✅ SunSafe: You are subscribed to daily UV alerts.');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

router.post('/send-now', async (req, res) => {
  try {
    const { phone, message } = req.body;
    if (!phone || !message) return res.status(400).json({ error: 'phone, message required' });
    const sid = await sendSMS(phone, message);
    res.json({ ok: true, sid });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;