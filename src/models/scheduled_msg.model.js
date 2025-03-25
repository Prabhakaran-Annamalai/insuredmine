const mongoose = require("mongoose");

const ScheduledMessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  day: { type: String, required: true }, // Format: 'YYYY-MM-DD'
  time: { type: String, required: true }, // Format: 'HH:mm'
  isProcessed: { type: Boolean, default: false },
},
{
  collection: "ScheduledMessage"
});

module.exports = mongoose.model("ScheduledMessage", ScheduledMessageSchema);
