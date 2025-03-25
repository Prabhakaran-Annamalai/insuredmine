const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: String,
},
{
  collection: "Agent" // Explicitly set collection name
});

module.exports = mongoose.model("Agent", agentSchema);
