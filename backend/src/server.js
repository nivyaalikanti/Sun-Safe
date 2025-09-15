import app from './app.js';
import { config } from './config.js';
import { startDailyAlerts } from './services/scheduler.js';

app.listen(config.port, () => {
  console.log(`SunSafe API listening on :${config.port}`);
  startDailyAlerts();
});
