import cron from 'node-cron';
import { config } from '../config.js';
import { readSubscribers } from './storage.js';
import { getUV } from './openuvService.js';
import { sendSMS } from './twilioService.js';

export function startDailyAlerts() {
  cron.schedule(config.alerts.cron, async () => {
    const subs = await readSubscribers();
    for (const sub of subs) {
      try {
        const { lat, lng, phone } = sub;
        const uvResp = await getUV({ lat, lng });
        const uv = uvResp?.result?.uv ?? 0;

        if (uv >= config.alerts.threshold) {
          const advice = uv >= 11 ? 'Extreme UV: minimize exposure, SPF 50+, hat & UV sunglasses.'
                     : uv >= 8  ? 'Very high UV: seek shade 11–3, SPF 50+, cover arms & neck.'
                     : 'High UV: SPF 30+, sunglasses, reapply every 2 hours.';
          const body = `☀️ SunSafe UV Alert\nLocation: ${lat.toFixed(3)},${lng.toFixed(3)}\nUV: ${uv.toFixed(1)}\n${advice}`;
          await sendSMS(phone, body);
        }
      } catch (e) {
        console.error('Alert error:', e.message);
      }
    }
  }, { timezone: config.alerts.tz });
}
