const express = require("express");

const {
  getCategories,
  craeteCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategories).post(craeteCategory);

module.exports = router;
