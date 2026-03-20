const mongoose = require('mongoose');
const Inventory = require('../models/inventory.model');
const asyncHandler = require('../utils/asyncHandler');

const validateQuantity = (quantity) => {
  if (!Number.isFinite(quantity) || quantity <= 0) {
    const error = new Error('quantity phải là số lớn hơn 0.');
    error.statusCode = 400;
    throw error;
  }
};

const validateObjectId = (id, fieldName = 'ID') => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`${fieldName} không hợp lệ.`);
    error.statusCode = 400;
    throw error;
  }
};

const getInventoryByProductId = async (productId) => {
  validateObjectId(productId, 'product');

  const inventory = await Inventory.findOne({ product: productId }).populate('product');
  if (!inventory) {
    const error = new Error('Không tìm thấy inventory của product này.');
    error.statusCode = 404;
    throw error;
  }

  return inventory;
};

exports.getAllInventories = asyncHandler(async (_req, res) => {
  const inventories = await Inventory.find()
    .populate('product')
    .sort({ createdAt: -1 });

  res.json({
    message: 'Lấy toàn bộ inventory thành công.',
    count: inventories.length,
    data: inventories
  });
});

exports.getInventoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateObjectId(id, 'inventory id');

  const inventory = await Inventory.findById(id).populate('product');
  if (!inventory) {
    return res.status(404).json({ message: 'Không tìm thấy inventory.' });
  }

  res.json({
    message: 'Lấy inventory theo ID thành công.',
    data: inventory
  });
});

exports.addStock = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;
  validateQuantity(Number(quantity));

  const inventory = await getInventoryByProductId(product);
  inventory.stock += Number(quantity);
  await inventory.save();
  await inventory.populate('product');

  res.json({
    message: 'Tăng stock thành công.',
    data: inventory
  });
});

exports.removeStock = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;
  validateQuantity(Number(quantity));

  const inventory = await getInventoryByProductId(product);

  if (inventory.stock < Number(quantity)) {
    return res.status(400).json({
      message: 'Stock không đủ để trừ.'
    });
  }

  inventory.stock -= Number(quantity);
  await inventory.save();
  await inventory.populate('product');

  res.json({
    message: 'Giảm stock thành công.',
    data: inventory
  });
});

exports.reserveStock = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;
  validateQuantity(Number(quantity));

  const inventory = await getInventoryByProductId(product);

  if (inventory.stock < Number(quantity)) {
    return res.status(400).json({
      message: 'Stock không đủ để reserve.'
    });
  }

  inventory.stock -= Number(quantity);
  inventory.reserved += Number(quantity);
  await inventory.save();
  await inventory.populate('product');

  res.json({
    message: 'Reserve hàng thành công.',
    data: inventory
  });
});

exports.soldStock = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;
  validateQuantity(Number(quantity));

  const inventory = await getInventoryByProductId(product);

  if (inventory.reserved < Number(quantity)) {
    return res.status(400).json({
      message: 'reserved không đủ để chuyển sang sold.'
    });
  }

  inventory.reserved -= Number(quantity);
  inventory.soldCount += Number(quantity);
  await inventory.save();
  await inventory.populate('product');

  res.json({
    message: 'Chuyển hàng sang sold thành công.',
    data: inventory
  });
});
