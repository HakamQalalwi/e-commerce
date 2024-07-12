const express = require("express");

const {
  getCategories,
  craeteCategory,
  getCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategories).post(craeteCategory);
router.route("/:id").get(getCategory);

module.exports = router;
