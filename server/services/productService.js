const Product = require("../models/productModel");
const factory = require("./handlersFactory");

// @route GET /api/v1/products

exports.getProducts = factory.getAll(Product, "Products");

// @route GET /api/v1/products/:id
exports.getProduct = factory.getOne(Product);

// @route POST /api/v1/products
exports.createProduct = factory.createOne(Product);

// @route PUT /api/v1/products/:id
exports.updateProduct = factory.updateOne(Product);

// @route DELETE /api/v1/products/:id
exports.deleteProduct = factory.deleteOne(Product);
