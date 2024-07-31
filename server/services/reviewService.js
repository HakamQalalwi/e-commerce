const Review = require("../models/reviewModel");
const factory = require("./handlersFactory");
const expressAsyncHandler = require("express-async-handler");

// @route GET /api/v1/reviews
exports.getReviews = factory.getAll(Review);

// @route GET /api/v1/reviews/:id
exports.getReview = factory.getOne(Review);

// @route POST /api/v1/reviews
exports.createReview = factory.createOne(Review);

// @route PUT /api/v1/reviews/:id
exports.updateReview = factory.updateOne(Review);

// @route DELETE /api/v1/reviews/:id
exports.deleteReview = factory.deleteOne(Review);
