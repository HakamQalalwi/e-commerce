const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @route POST /api/v1/subcategories
exports.createSubCategory = factory.createOne(SubCategory);

// @route GET /api/v1/subcategories
exports.getSubCategories = factory.getAll(SubCategory);

// @route GET /api/v1/subcategories/:id
exports.getSubCategory = factory.getOne(SubCategory);

// @route PUT /api/v1/subcategories/:id
exports.updateSubCategory = factory.updateOne(SubCategory);

// @route DELETE /api/v1/subcategories/:id
exports.deleteSubCategory = factory.deleteOne(SubCategory);
