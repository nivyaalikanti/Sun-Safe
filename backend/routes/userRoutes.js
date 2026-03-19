const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      latitude,
      longitude,
      uvThreshold,
      frequency,
      peakAlert
    } = req.body;

    const user = new User({
      name,
      phone,
      email,
      latitude,
      longitude,
      uvThreshold,
      frequency,
      peakAlert
    });

    await user.save();

    res.json({
      message: "Subscribed Successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Subscription failed"
    });
  }
});

module.exports = router;