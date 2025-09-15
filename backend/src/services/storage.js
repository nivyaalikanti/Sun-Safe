import { promises as fs } from 'fs';
import path from 'path';
const file = path.resolve(process.cwd(), 'data', 'subscribers.json');

export async function readSubscribers() {
  try {
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeSubscribers(list) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(list, null, 2));
}

export async function upsertSubscriber(sub) {
  const list = await readSubscribers();
  const idx = list.findIndex(s => s.phone === sub.phone);
  if (idx >= 0) list[idx] = { ...list[idx], ...sub };
  else list.push(sub);
  await writeSubscribers(list);
  return sub;
}
