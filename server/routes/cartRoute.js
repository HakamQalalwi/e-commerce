const express = require("express");
const { addProductToCart } = require("../services/cartService");
const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .post(authService.protect, authService.allowedTo("user"), addProductToCart);

module.exports = router;
