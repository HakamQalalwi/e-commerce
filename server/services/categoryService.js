const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");

// Disk Storage engine
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only Image allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadCategoryImage = upload.single("image");
// @route GET /api/v1/categories

exports.getCategories = factory.getAll(Category);

// @route GET /api/v1/categories/:id
exports.getCategory = factory.getOne(Category);

// @route POST /api/v1/categories
exports.craeteCategory = factory.createOne(Category);

// @route PUT /api/v1/categories/:id
exports.updateCategory = factory.updateOne(Category);

// @route DELETE /api/v1/categories/:id
exports.deleteCategory = factory.deleteOne(Category);
