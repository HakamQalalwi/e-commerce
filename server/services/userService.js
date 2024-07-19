const User = require("../models/userModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

// Upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");

// image processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    // Save image on database
    req.body.profileImg = filename;
  }

  next();
});

// @route GET /api/v1/users
// @access Private
exports.getUsers = factory.getAll(User);

// @route GET /api/v1/users/:id
// @access Private
exports.getUser = factory.getOne(User);

// @route POST /api/v1/users
// @access Private
exports.craeteUser = factory.createOne(User);

// @route PUT /api/v1/users/:id
// @access Private
exports.updateUser = factory.updateOne(User);

// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);
