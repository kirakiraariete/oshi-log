import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      // 金庫からデータを取り出す
      const data = await kv.get('user_oshi_data');
      return response.status(200).json(data || []);
    }
    if (request.method === 'POST') {
      // 金庫にデータを保存する
      await kv.set('user_oshi_data', request.body);
      return response.status(200).json({ status: 'saved' });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
