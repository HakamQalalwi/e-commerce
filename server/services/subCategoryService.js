const SubCategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @route POST /api/v1/subcategories
exports.createSubCategory = factory.createOne(SubCategory);

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
exports.updateSubCategory = factory.updateOne(SubCategory);

// @route DELETE /api/v1/subcategories/:id
exports.deleteSubCategory = factory.deleteOne(SubCategory);