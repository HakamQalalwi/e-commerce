const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");

// @route GET /api/v1/brands

exports.getBrands = factory.getAll(Brand);
// @route GET /api/v1/brands/:id
exports.getBrand = factory.getOne(Brand);
// @route POST /api/v1/brands
exports.craeteBrand = factory.createOne(Brand);

// @route PUT /api/v1/brands/:id
exports.updateBrand = factory.updateOne(Brand);

// @route DELETE /api/v1/brands/:id
exports.deleteBrand = factory.deleteOne(Brand);
