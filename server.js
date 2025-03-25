const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./src/routes/upload.routes');
const policyRoutes = require('./src/routes/policy.routes');
const scheduledRoutes = require("./src/routes/scheduled_msg.routes");
mongoose.set("debug", true);

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/insuredmine', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Failed", err));

app.use('/api/upload', uploadRoutes);
app.use('/api/policy', policyRoutes);
// Routes
const scheduledMessageRoutes = require("./src/routes/scheduled_msg.routes");
app.use("/api/messages", scheduledMessageRoutes);

require("./src/services/scheduled_msg.service");
app.use("/api/posts", scheduledRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
