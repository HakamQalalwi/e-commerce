const express = require("express");

const authService = require("../services/authService");

const {
  addProductToWishlist,
  removeProductFromWishlist,
} = require("../services/wishlistService");

const router = express.Router();

router.post(
  "/",
  authService.protect,
  authService.allowedTo("user"),
  addProductToWishlist
);

router.delete(
  "/:productId",
  authService.protect,
  authService.allowedTo("user"),
  removeProductFromWishlist
);

module.exports = router;
