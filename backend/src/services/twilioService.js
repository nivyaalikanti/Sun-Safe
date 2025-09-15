import twilio from 'twilio';
import { config } from '../config.js';

const client = twilio(config.twilio.sid, config.twilio.token);

export async function sendSMS(to, body) {
  if (!to || !body) throw new Error('Missing to/body');
  const msg = await client.messages.create({
    from: config.twilio.from,
    to,
    body
  });
  return msg.sid;
}
