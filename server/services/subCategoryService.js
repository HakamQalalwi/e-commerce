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
