const express = require("express");

const authService = require("../services/authService");

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../services/wishlistService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router.post("/", addProductToWishlist);

router.get("/", getLoggedUserWishlist);

router.delete("/:productId", removeProductFromWishlist);

module.exports = router;
