const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // Sesuaikan dengan konfigurasi database Anda
const invoicesRouter = require('./routes/invoices'); // Sesuaikan dengan rute yang ada

const app = express();

// Middleware CORS
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan rute
app.use('/api/invoices', invoicesRouter);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // Check database connection
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error connecting to the database', err.stack);
//   } else {
//     console.log('Connected to the database:', res.rows[0]);
//   }
// });
