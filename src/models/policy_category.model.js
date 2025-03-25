const mongoose = require("mongoose");

const policyCategorySchema = new mongoose.Schema({
  categoryName: String,
},
{
  collection: "LOB"
});

module.exports = mongoose.model("LOB", policyCategorySchema);
