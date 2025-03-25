const mongoose = require("mongoose");

const policyCarrierSchema = new mongoose.Schema({
  companyName: String,
},
{
  collection: "Carrier"
});

module.exports = mongoose.model("Carrier", policyCarrierSchema);
