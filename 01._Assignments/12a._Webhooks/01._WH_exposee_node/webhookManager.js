import axios from 'axios';
import { db } from './db.js';

export async function register(url, event) {
  const result = await db.run(
    `INSERT INTO webhooks (url, event) VALUES (?, ?)`,
    [url, event]
  );
  return result.lastID;
}

export async function unregister(id) {
    const result = await db.run(`DELETE FROM webhooks WHERE id = ?`, [id]);
    return result.changes > 0;
    }
    
export async function triggerEvent(event, data) {
  const webhooks = await db.all(`SELECT * FROM webhooks WHERE event = ?`, [event]);
  for (const webhook of webhooks) {
    try {
      await axios.post(webhook.url, data);
    } catch (error) {
      console.error(`Failed to trigger webhook ${webhook.id}:`, error.message);
    }
  }
}