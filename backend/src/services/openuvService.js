import axios from 'axios';
import { config } from '../config.js';

const BASE = 'https://api.openuv.io/api/v1';

export async function getUV({ lat, lng }) {
  const resp = await axios.get(`${BASE}/uv`, {
    params: { lat, lng },
    headers: { 'x-access-token': config.openuvApiKey }
  });
  return resp.data; 
}
