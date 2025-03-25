const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  policy_number: String,
  policy_start_date: Date,
  policy_end_date: Date,
  policy_category_id: mongoose.Schema.Types.ObjectId,
  policy_carrier_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId
},
{
  collection: "Policy"
});

module.exports = mongoose.model("Policy", policySchema);
