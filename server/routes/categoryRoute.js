const express = require("express");

const {
  getCategories,
  craeteCategory,
  getCategory,
  updateCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategories).post(craeteCategory);
router.route("/:id").get(getCategory).put(updateCategory);

module.exports = router;
