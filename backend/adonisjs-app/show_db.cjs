const Database = require('better-sqlite3');
const db = new Database('tmp/db.sqlite3');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';").all();
console.log('tables:', tables.map(t => t.name));
for (const { name } of tables) {
  console.log('---', name);
  const rows = db.prepare(`SELECT * FROM ${name} LIMIT 50`).all();
  console.log(rows);
}
db.close();
