const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export async function fetchUV(lat, lng) {
  const r = await fetch(`${BASE}/uv`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng })
  });
  return r.json();
}

export async function subscribeSMS(phone, lat, lng) {
  const r = await fetch(`${BASE}/sms/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, lat, lng })
  });
  return r.json();
}

export async function chat(section, uvIndex, locationName, message) {
  const r = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, uvIndex, locationName, message })
  });
  return r.json();
}
