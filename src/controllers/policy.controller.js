const policyService = require("../services/policy.service");

const searchPolicyByUsername = async (req, res) => {
  try {
    const { firstName } = req.params;
    const { user, policies } = await policyService.findPoliciesByUsername(firstName);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (policies.length === 0) {
      return res.status(200).json({ message: "No policies available for the user" });
    }
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching policy info", error });
  }
};


const getAggregatedPolicies = async (req, res) => {
  try {
    const policies = await policyService.aggregatePoliciesByUser();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: "Error aggregating policies", error });
  }
};

module.exports = { searchPolicyByUsername, getAggregatedPolicies };
