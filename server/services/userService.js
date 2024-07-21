const User = require("../models/userModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");

// Upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");

// image processing method
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    // Save image on our database
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
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});


// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);
