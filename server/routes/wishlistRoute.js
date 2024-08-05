const express = require("express");

const authService = require("../services/authService");

const { addProductToWishlist } = require("../services/wishlistService");

const router = express.Router();

router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("user"),
    addProductToWishlist
  );

module.exports = router;
