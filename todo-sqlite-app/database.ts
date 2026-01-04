import * as SQLite from 'expo-sqlite';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline?: string;
}

export async function openDatabase() {
  const db = await SQLite.openDatabaseAsync('todo.db');
  
  await db.execAsync(`DROP TABLE IF EXISTS tasks;`);
  
  await db.execAsync(`
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT,
      deadline TEXT
    );
  `);
  
  return db;
}