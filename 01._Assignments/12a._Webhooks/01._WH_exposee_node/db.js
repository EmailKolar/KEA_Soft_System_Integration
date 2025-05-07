import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();//error messages

export const db = await open({
    filename: './webhooks.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS webhooks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      event TEXT NOT NULL
    )
  `);