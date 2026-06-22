import Database from "better-sqlite3";

export const db = new Database("pizza.db");

// cria tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT,
    product TEXT,
    preparationTime INTEGER,
    alertTime INTEGER,
    createdAt TEXT,
    status TEXT
  )
`);
