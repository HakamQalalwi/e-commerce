const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");
const slugify = require("slugify");

exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .notEmpty()
    .withMessage("Product title is required")
    .custom((val, { req }) => {
      if (typeof val !== "string") {
        throw new Error("Title must be a string");
      }
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Available colors should be an array of strings"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images should be an array of strings"),
  check("category")
    .notEmpty()
    .withMessage("Product must belong to a category")
    .isMongoId()
    .withMessage("Invalid category ID format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category found for this ID: ${categoryId}`)
          );
        }
      })
    ),
  check("subcategories")
    .optional()
    .isArray()
    .withMessage("Subcategories should be an array")
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $in: subcategoriesIds } }).then((result) => {
        if (result.length !== subcategoriesIds.length) {
          return Promise.reject(new Error(`Invalid subcategory IDs`));
        }
      })
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = subcategories.map((sub) =>
            sub._id.toString()
          );
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`Subcategories do not belong to category`)
            );
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("Invalid brand ID format"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Ratings average must be a number")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1.0 and 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Ratings quantity must be a number"),

  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      if (typeof val !== "string") {
        throw new Error("Title must be a string");
      }
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  validatorMiddleware,
];
