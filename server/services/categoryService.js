const Category = require("../models/CategoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// @route GET /api/v1/categories

exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @route GET /api/v1/categories/:id
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});

// @route POST /api/v1/categories
exports.craeteCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @route PUT /api/v1/categories/:id
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});

// @route DELETE /api/v1/categories/:id
exports.deleteCategory = asyncHandler(async(req,res) => {
  const {id} = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(204).send();
})