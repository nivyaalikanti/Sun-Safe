const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: false
  },

  latitude: Number,

  longitude: Number,

  uvThreshold: {
    type: Number,
    default: 6
  },

  frequency: {
    type: String,
    enum: ["daily", "realtime"],
    default: "daily"
  },

  peakAlert: {
    type: Boolean,
    default: true
  },

  email: {
    type: String,
    required: false
  },

  lastAlertSent: Date,

  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("User", userSchema);