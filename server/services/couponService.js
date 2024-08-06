const Coupon = require("../models/couponModel");
const factory = require("./handlersFactory");

// @route GET /api/v1/coupons
exports.getCoupons = factory.getAll(Coupon);
// @route GET /api/v1/coupons/:id
exports.getCoupon = factory.getOne(Coupon);
// @route POST /api/v1/coupons
exports.createCoupon = factory.createOne(Coupon);

// @route PUT /api/v1/coupons/:id
exports.updateCoupon = factory.updateOne(Coupon);

// @route DELETE /api/v1/coupons/:id
exports.deleteCoupon = factory.deleteOne(Coupon);
