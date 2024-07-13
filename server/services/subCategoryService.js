const SubCategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");

// @route POST /api/v1/subcategories
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});


// @route GET /api/v1/subcategories
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: subCategories.length, page, data: subCategories });
});

// @route GET /api/v1/subcategories/:id
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No sub Category for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});