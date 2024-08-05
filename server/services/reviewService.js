const Review = require("../models/reviewModel");
const factory = require("./handlersFactory");

// GET /api/v1/products/:productId/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};

// @route GET /api/v1/reviews
exports.getReviews = factory.getAll(Review);

// @route GET /api/v1/reviews/:id
exports.getReview = factory.getOne(Review);


exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if(!req.body.user) req.body.user = req.user._id;
  next();
};

// @route POST /api/v1/reviews
exports.createReview = factory.createOne(Review);

// @route PUT /api/v1/reviews/:id
exports.updateReview = factory.updateOne(Review);

// @route DELETE /api/v1/reviews/:id
exports.deleteReview = factory.deleteOne(Review);
