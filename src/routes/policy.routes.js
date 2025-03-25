const express = require('express');
const { searchPolicyByUsername, getAggregatedPolicies } = require('../controllers/policy.controller');

const router = express.Router();

router.get('/search/:firstName', searchPolicyByUsername);

router.get('/aggregate', getAggregatedPolicies);

module.exports = router;
