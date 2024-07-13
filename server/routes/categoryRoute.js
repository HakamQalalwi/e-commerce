const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");

const {
  getCategories,
  craeteCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const subcategoriesRoute = require("./subCategoryRoute");
const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);
router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, craeteCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
