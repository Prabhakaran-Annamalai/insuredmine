const express = require('express');
const { scheduleMessage } = require('../controllers/scheduled_msg.controller');

const router = express.Router();

router.post("/schedule", scheduleMessage);

module.exports = router;
