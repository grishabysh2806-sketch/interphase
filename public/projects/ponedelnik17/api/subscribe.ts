import { MongoClient } from 'mongodb';

const isValidEmail = (email: string) => {
  const e = email.trim().toLowerCase();
  if (!e) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
};

let client: MongoClient | null = null;
let mongoReady = false;

const getMongoDb = async () => {
  const uri = process.env.MONGODB_URI || '';
  const dbName = process.env.MONGODB_DB || 'monday';
  if (!uri) return null;

  if (!client) client = new MongoClient(uri);
  if (!mongoReady) {
    await client.connect();
    const db = client.db(dbName);
    await db.collection('subscribers').createIndex({ email: 1 }, { unique: true });
    mongoReady = true;
  }
  return client.db(dbName);
};

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const db = await getMongoDb();
    if (!db) {
      res.status(500).json({ error: 'MongoDB is not configured' });
      return;
    }

    const email = String(req.body?.email ?? '').trim().toLowerCase();
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Invalid email' });
      return;
    }

    const now = new Date();
    await db.collection('subscribers').updateOne(
      { email },
      { $setOnInsert: { email, createdAt: now, confirmed: true }, $set: { updatedAt: now } },
      { upsert: true }
    );

    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message ?? e) });
  }
}
