// server/routes/invoices.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Endpoint untuk mendapatkan detail invoice dan produk terkait
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: 'Invoice ID is required' });
  }

  try {
    // Get the invoice
    const invoiceResult = await pool.query(
      'SELECT * FROM invoices WHERE id = $1',
      [id]
    );
    const invoice = invoiceResult.rows[0];
    if (!invoice) {
      return res.status(404).send({ error: 'Invoice not found' });
    }

    // Get the products for this invoice
    const productsResult = await pool.query(
      'SELECT * FROM invoice_products WHERE invoice_id = $1',
      [id]
    );
    const products = productsResult.rows;

    res.json({ invoice, products });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch invoice details' });
  }
});

// Endpoint untuk menambahkan invoice baru dan produk terkait
router.post('/', async (req, res) => {
  console.log('Request body:', req.body); // Tambahkan logging di sini
  const { date, customer_name, salesperson_name, notes, total_amount } =
    req.body;

  if (!date || !customer_name || !salesperson_name || !total_amount) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO invoices (date, customer_name, salesperson_name, notes, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [date, customer_name, salesperson_name, notes, total_amount]
    );
    const newInvoice = result.rows[0];
    console.log('New invoice created:', newInvoice);
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).send({ error: 'Failed to create invoice' });
  }
});

module.exports = router;
