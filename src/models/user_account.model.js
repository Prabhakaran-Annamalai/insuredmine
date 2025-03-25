const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  accountName: String,
},
{
  collection: "UsersAccount"
});

module.exports = mongoose.model("UsersAccount", userAccountSchema);
