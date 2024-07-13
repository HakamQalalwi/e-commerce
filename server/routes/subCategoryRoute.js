const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validator/subCategoryValidator");

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router.route("/:id").get(getSubCategoryValidator, getSubCategory);

module.exports = router;
