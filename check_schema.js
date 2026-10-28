const db = require('C:\\Users\\FOREX\\Downloads\\Parking System\\backend\\src\\config\\database.js');
const info = db.prepare('PRAGMA table_info(system_alerts)').all();
console.log('Columns:', info.map(c => c.name + ' (' + c.type + (c.pk ? ' PK' : '') + ')').join(', '));
const check = db.prepare('SELECT sql FROM sqlite_master WHERE type="table" AND name="system_alerts"').get();
console.log('Full SQL:');
console.log(check.sql);