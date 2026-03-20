const express = require('express');
const productRoutes = require('./routes/product.routes');
const inventoryRoutes = require('./routes/inventory.routes');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'Inventory API is running'
  });
});

app.use('/api/products', productRoutes);
app.use('/api/inventories', inventoryRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route không tồn tại.'
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || 'Lỗi server.'
  });
});

module.exports = app;
