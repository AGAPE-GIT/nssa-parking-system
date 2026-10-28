const db = require('./backend/src/config/database');
const ddl = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='payments'").get();
console.log('Payments table DDL:', ddl ? ddl.sql : 'not found');
if (ddl && ddl.sql && ddl.sql.includes("'cash'")) {
  console.log('✅ CHECK constraint includes cash');
} else if (ddl) {
  console.log('❌ CHECK constraint does NOT include cash');
}