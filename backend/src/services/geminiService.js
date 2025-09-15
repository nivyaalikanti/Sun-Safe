import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config.js';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

export async function getSuggestions({ section, uvIndex, locationName, message }) {
  const model = genAI.getGenerativeModel({ model: config.gemini.model });

  const sys = `You are SunSafe, an assistant giving concise, actionable guidance
for health, agriculture, and climate, with a focus on UV index. Your primary goal is to
directly address the user's message. Keep responses concise and under 120 words.
Do not use any bold or markdown formatting, and begin each subpoint with a hyphen (-).
Avoid making medical claims.`;

  const user = `
Section: ${section}
UV Index: ${uvIndex}
Location: ${locationName || 'Unknown'}
User message: ${message || 'Give tailored suggestions.'}

The following are general themes for each section, but your answer should prioritize the user's specific question:
- Health: give only health related content, what user is aksing
- Agriculture: give only agriculture related content, what user is aksing
- Climate: give only climate related content, what user is aksing
`;

  const result = await model.generateContent([sys, user]);
  return result.response.text();
}
