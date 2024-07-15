const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const slugify = require("slugify");
const dbConnection = require("../config/database");

// @route GET /api/v1/products

exports.getProducts = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  //Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await apiFeatures.mongooseQuery;
  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

// @route GET /api/v1/products/:id
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @route POST /api/v1/products
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @route PUT /api/v1/products/:id
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @route DELETE /api/v1/products/:id
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(204).send();
});
