const pool = require('../config/db');

class Invoice {
  static async getAll() {
    const result = await pool.query('SELECT * FROM invoices');
    return result.rows;
  }

  static async create({
    date,
    customer_name,
    salesperson_name,
    notes,
    total_amount,
  }) {
    const result = await pool.query(
      'INSERT INTO invoices (date, customer_name, salesperson_name, notes, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [date, customer_name, salesperson_name, notes, total_amount]
    );
    return result.rows[0];
  }
  static async getById(id) {
    const result = await pool.query('SELECT * FROM invoices WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  }
}

module.exports = Invoice;
