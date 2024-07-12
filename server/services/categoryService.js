const CategoryModel = require("../models/categoryModel");

exports.getCategories = (req, res) => {
  const name = req.body.name;

  console.log(req.body);

  const newCategory = new CategoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.error(`Error saving to database: ${err}`);
      res.status(500).json({ error: "Error saving to database" });
    });
};
