// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const invoiceRoutes = require('./routes/invoices');
const productRoutes = require('./routes/products');
const pool = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/invoices', invoiceRoutes);
app.use('/api/products', productRoutes);

// Check database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database:', res.rows[0]);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
