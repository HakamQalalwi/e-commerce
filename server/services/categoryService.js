const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");

// Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

// image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`);

    // Save image on database
    req.body.image = filename;
  }

  next();
});
// @route GET /api/v1/categories

exports.getCategories = factory.getAll(Category);

// @route GET /api/v1/categories/:id
exports.getCategory = factory.getOne(Category);

// @route POST /api/v1/categories
exports.createCategory = factory.createOne(Category);

// @route PUT /api/v1/categories/:id
exports.updateCategory = factory.updateOne(Category);

// @route DELETE /api/v1/categories/:id
exports.deleteCategory = factory.deleteOne(Category);
