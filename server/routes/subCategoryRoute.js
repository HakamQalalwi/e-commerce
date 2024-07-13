const express = require("express");
const router = express.Router();

const { createSubCategory } = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
} = require("../utils/validator/subCategoryValidator");

router.route("/").post(createSubCategoryValidator, createSubCategory);

module.exports = router;
