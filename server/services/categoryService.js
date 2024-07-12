const CategoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

exports.getCategories = (req, res) => {
  // const name = req.body.name;

  // console.log(req.body);
  res.send();
};

exports.craeteCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});