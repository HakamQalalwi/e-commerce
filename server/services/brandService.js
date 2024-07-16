const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const slugify = require("slugify");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @route GET /api/v1/brands

exports.getBrands = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  //Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;

  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

// @route GET /api/v1/brands/:id
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @route POST /api/v1/brands
exports.craeteBrand = factory.createOne(Brand);

// @route PUT /api/v1/brands/:id
exports.updateBrand = factory.updateOne(Brand);

// @route DELETE /api/v1/brands/:id
exports.deleteBrand = factory.deleteOne(Brand);