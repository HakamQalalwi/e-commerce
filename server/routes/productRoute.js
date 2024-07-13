const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validator/productValidator");

const {
  getProducts,
  craeteProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, craeteProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
