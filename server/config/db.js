const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Marsbumi17',
  database: 'invoice_db',
  port: 5432,
});

pool.query('SELECT * from products', (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  pool.end;
});

module.exports = pool;
