const CategoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");


// @route GET /api/v1/categories

exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});


// @route GET /api/v1/categories/:id
exports.getCategory = asyncHandler(async(req, res) => {
  const {id} = req.params;
  const category = await CategoryModel.findById(id);
  if(!category){
    res.status(404).json({msg:`No category for this id ${id}` });
  }
  res.status(200).json({data: category});
})

// @route POST /api/v1/categories
exports.craeteCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});