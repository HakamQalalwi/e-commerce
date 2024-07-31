const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");



// Upload single image
exports.uploadBrandImage = uploadSingleImage("image");


// image processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

    // Save image on database
    req.body.image = filename;

  next();
});

// @route GET /api/v1/brands
exports.getBrands = factory.getAll(Brand);
// @route GET /api/v1/brands/:id
exports.getBrand = factory.getOne(Brand);
// @route POST /api/v1/brands
exports.createBrand = factory.createOne(Brand);

// @route PUT /api/v1/brands/:id
exports.updateBrand = factory.updateOne(Brand);

// @route DELETE /api/v1/brands/:id
exports.deleteBrand = factory.deleteOne(Brand);
