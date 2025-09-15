import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import uvRoutes from './routes/uv.js';
import smsRoutes from './routes/sms.js';
import chatRoutes from './routes/chat.js';

const app = express();
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'SunSafe API' }));
app.use('/api/uv', uvRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/chat', chatRoutes);

export default app;
