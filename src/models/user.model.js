const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  dob: Date,
  address: String,
  phoneNumber: String,
  state: String,
  zipCode: String,
  email: String,
  gender: String,
  userType: String,
},
{
  collection: "User"
});

module.exports = mongoose.model("User", userSchema);
