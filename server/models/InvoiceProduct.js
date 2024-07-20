// server/models/InvoiceProduct.js
const pool = require('../config/db');

class InvoiceProduct {
  static async create({ invoice_id, product_id, quantity }) {
    const result = await pool.query(
      'INSERT INTO invoice_products (invoice_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [invoice_id, product_id, quantity]
    );
    return result.rows[0];
  }

  static async getByInvoiceId(invoice_id) {
    const result = await pool.query(
      'SELECT * FROM invoice_products WHERE invoice_id = $1',
      [invoice_id]
    );
    return result.rows;
  }
}

module.exports = InvoiceProduct;
