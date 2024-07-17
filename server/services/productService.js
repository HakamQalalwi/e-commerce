const multer = require("multer");
const ApiError = require("../utils/apiError");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const factory = require("./handlersFactory");

const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only Image allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImage = upload.fields([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image on database
    req.body.imageCover = imageCoverFileName;
  }

  // image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image on database
        req.body.images.push(imageName);
      })
    );

    next();
  }
});

// @route GET /api/v1/products

exports.getProducts = factory.getAll(Product, "Products");

// @route GET /api/v1/products/:id
exports.getProduct = factory.getOne(Product);

// @route POST /api/v1/products
exports.createProduct = factory.createOne(Product);

// @route PUT /api/v1/products/:id
exports.updateProduct = factory.updateOne(Product);

// @route DELETE /api/v1/products/:id
exports.deleteProduct = factory.deleteOne(Product);
