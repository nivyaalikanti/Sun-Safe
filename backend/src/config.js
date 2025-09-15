import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  openuvApiKey: process.env.OPENUV_API_KEY,

  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID,
    token: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_FROM_NUMBER
  },

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash'
  },

  alerts: {
    threshold: Number(process.env.ALERT_UV_THRESHOLD || 6),
    cron: process.env.ALERT_CRON || '20 17 * * *',
    tz: process.env.ALERT_TZ || 'Asia/Kolkata'
  }
};
