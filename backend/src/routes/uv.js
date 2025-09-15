import { Router } from 'express';
import { getUV } from '../services/openuvService.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'lat/lng required' });
    }
    const data = await getUV({ lat, lng });
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
