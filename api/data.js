import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const KEY = 'user_oshi_log_final_stable';
  if (req.method === 'GET') return res.status(200).json(await kv.get(KEY) || []);
  if (req.method === 'POST') {
    await kv.set(KEY, req.body);
    return res.status(200).json({ status: 'saved' });
  }
}
