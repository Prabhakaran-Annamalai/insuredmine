const Policy = require("../models/policy_info.model");
const User = require("../models/user.model");

// Search policy by username
const mongoose = require("mongoose");

const findPoliciesByUsername = async (firstName) => { 
  const user = await User.findOne({ first_name: firstName });
  if (!user) return { user: null, policies: [] };
  const policies = await Policy.find({ user_id: user._id });
  return { user, policies };
};

// Aggregate policies by user
const aggregatePoliciesByUser = async () => {
  return await Policy.aggregate([
    {
      $lookup: {
        from: "User",
        localField: "user_id",
        foreignField: "_id",
        as: "user_details",
      },
    },
    { $unwind: "$user_details" },
    {
      $group: {
        _id: "$user_details.first_name",
        user_details: { $first: "$user_details" },
        policies: { $push: "$$ROOT" },
        totalPolicies: { $sum: 1 },
      },
    },
  ]);
};

module.exports = { findPoliciesByUsername, aggregatePoliciesByUser };
