const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

// exports.getSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid SubCategory Id Format"),
//   validatorMiddleware,
// ];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too Short SubCategory Name")
    .isLength({ max: 32 })
    .withMessage("Too Long SubCategory Name"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must belong to Category")
    .isMongoId()
    .withMessage("Invalid Category Id Format"),
  validatorMiddleware,
];

// exports.updateSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid SubCategory Id Format"),
//   validatorMiddleware,
// ];

// exports.deleteSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid SubCategory Id Format"),
//   validatorMiddleware,
// ];
