const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @route GET /api/v1/categories

exports.getCategories = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await Category.countDocuments();
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;

  res
    .status(200)
    .json({ results: categories.length, paginationResult, data: categories });
});

// @route GET /api/v1/categories/:id
exports.getCategory = factory.getOne(Category);

// @route POST /api/v1/categories
exports.craeteCategory = factory.createOne(Category);

// @route PUT /api/v1/categories/:id
exports.updateCategory = factory.updateOne(Category);

// @route DELETE /api/v1/categories/:id
exports.deleteCategory = factory.deleteOne(Category);