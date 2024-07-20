const pool = require('../config/db');

class Product {
  static async getAll() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  }

  static async create({ name, picture_url, stock, price }) {
    const result = await pool.query(
      'INSERT INTO products (name, picture_url, stock, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, picture_url, stock, price]
    );
    return result.rows[0];
  }
}

module.exports = Product;
