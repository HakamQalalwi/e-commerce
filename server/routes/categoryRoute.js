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
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryService");

const authService = require("../services/authService");

const subcategoriesRoute = require("./subCategoryRoute");
const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);
router
  .route("/")
  .get(getCategories)
  .post(
    authService.protect,
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    craeteCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
