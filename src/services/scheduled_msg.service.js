const cron = require("node-cron");
const ScheduledMessage = require("../models/scheduled_msg.model");

// Run every minute to check for scheduled messages
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    // Convert to UTC
    const currentDateUTC = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTimeUTC = now.getUTCHours().toString().padStart(2, "0") + ":" + 
                           now.getUTCMinutes().toString().padStart(2, "0"); // HH:mm

    console.log(`Current Server Time (UTC): ${currentDateUTC} ${currentTimeUTC}`);

    // Find messages scheduled for the current date and time
    const messages = await ScheduledMessage.find({ 
      day: currentDateUTC, 
      time: currentTimeUTC, 
      isProcessed: false 
    });

    console.log(`Found ${messages.length} messages to process`);

    if (messages.length > 0) {
      messages.forEach(async (msg) => {
        console.log(`Processing Message: ${msg.message}`);
        msg.isProcessed = true;
        await msg.save();
      });
    }
  } catch (error) {
    console.error("Error processing scheduled messages:", error);
  }
});
