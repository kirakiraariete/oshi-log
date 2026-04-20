import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const data = await kv.get('user_oshi_data_final');
      return response.status(200).json(data || []);
    }
    if (request.method === 'POST') {
      await kv.set('user_oshi_data_final', request.body);
      return response.status(200).json({ status: 'saved' });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
