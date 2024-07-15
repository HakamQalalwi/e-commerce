const SubCategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");
const ApiFeatures = require("../utils/apiFeatures");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
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

// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @route GET /api/v1/subcategories
exports.getSubCategories = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await SubCategory.countDocuments();
  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const subCategories = await mongooseQuery;
  res.status(200).json({
    results: subCategories.length,
    paginationResult,
    data: subCategories,
  });
});

// @route GET /api/v1/subcategories/:id
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  // .populate({
  //   path: "category",
  //   select: "name -_id",
  // });
  if (!subCategory) {
    return next(new ApiError(`No sub Category for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});


// @route PUT /api/v1/subcategories/:id
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category},
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError(`No Sub Category for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @route DELETE /api/v1/subcategories/:id
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No Sub Category for this id ${id}`, 404));
  }
  res.status(204).send();
});
