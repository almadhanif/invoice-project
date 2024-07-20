const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const InvoiceProduct = require('../models/InvoiceProduct');
const sequelize = require('../config/db');

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createInvoice = async (req, res) => {
  const { date, customer_name, salesperson_name, notes, products } = req.body;

  try {
    const result = await sequelize.transaction(async (t) => {
      const invoice = await Invoice.create(
        { date, customer_name, salesperson_name, notes, total_amount: 0 },
        { transaction: t }
      );
      let total_amount = 0;

      for (const product of products) {
        const prod = await Product.findByPk(product.id);
        await InvoiceProduct.create(
          {
            invoice_id: invoice.id,
            product_id: prod.id,
            quantity: product.quantity,
          },
          { transaction: t }
        );
        total_amount += prod.price * product.quantity;
      }

      invoice.total_amount = total_amount;
      await invoice.save({ transaction: t });

      return invoice;
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getInvoices, createInvoice };
