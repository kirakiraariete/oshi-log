import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const data = await kv.get('user_oshi_log_final_stable');
      return response.status(200).json(data || []);
    }
    if (request.method === 'POST') {
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
      await kv.set('user_oshi_log_final_stable', body);
      return response.status(200).json({ status: 'saved' });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
