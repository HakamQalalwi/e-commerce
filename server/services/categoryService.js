const CategoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");


// @route GET /api/v1/categories

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.find({});
  res.status(200).json({results: categories.length, data: categories});
});

// @route POST /api/v1/categories
exports.craeteCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});