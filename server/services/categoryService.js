const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");

// @route GET /api/v1/categories

exports.getCategories = factory.getAll(Category);

// @route GET /api/v1/categories/:id
exports.getCategory = factory.getOne(Category);

// @route POST /api/v1/categories
exports.craeteCategory = factory.createOne(Category);

// @route PUT /api/v1/categories/:id
exports.updateCategory = factory.updateOne(Category);

// @route DELETE /api/v1/categories/:id
exports.deleteCategory = factory.deleteOne(Category);
