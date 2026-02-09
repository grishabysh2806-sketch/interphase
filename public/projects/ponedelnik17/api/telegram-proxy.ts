export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { method, params } = req.body;
  // Make sure to add BOT_TOKEN to your Vercel Environment Variables
  const BOT_TOKEN = process.env.BOT_TOKEN;

  if (!BOT_TOKEN) {
    return res.status(500).json({ error: 'BOT_TOKEN not configured in Vercel' });
  }

  try {
    // Using api.tgprox.ru as requested for Russia support
    const response = await fetch(
      `https://api.tgprox.ru/bot${BOT_TOKEN}/${method}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      }
    );
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error('Telegram proxy error:', error);
    res.status(500).json({ error: String(error?.message ?? error) });
  }
}
