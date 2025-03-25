const ScheduledMessage = require("../models/scheduled_msg.model");

exports.scheduleMessage = async (req, res) => {
  try {
    const { message, day, time } = req.body;

    // Convert input time to UTC
    const [hour, minute] = time.split(":").map(Number);
    const dateObj = new Date(day);
    dateObj.setUTCHours(hour, minute, 0, 0); // Set UTC time

    const nowUTC = new Date();
    if (dateObj <= nowUTC) {
      return res.status(400).json({ error: "Scheduled time must be in the future!" });
    }

    const utcDay = dateObj.toISOString().split("T")[0]; // Get UTC date
    const utcTime = dateObj.getUTCHours().toString().padStart(2, "0") + ":" + 
                    dateObj.getUTCMinutes().toString().padStart(2, "0"); // Get UTC time

    console.log(`Saving to DB -> Day: ${utcDay}, Time: ${utcTime} UTC`);

    const newMessage = new ScheduledMessage({ 
      message, 
      day: utcDay, 
      time: utcTime, 
      isProcessed: false 
    });

    await newMessage.save();
    res.status(201).json({ message: "Message scheduled successfully!", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule message" });
  }
};
