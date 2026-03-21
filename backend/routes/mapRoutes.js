const express = require("express");
const router = express.Router();

const { getUVIndex } = require("../services/openuvService");

// Map UV route
router.get("/uv", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and Longitude are required",
      });
    }

    const uv = await getUVIndex(lat, lon);

    res.json({ uv });
  } catch (error) {
    console.error("Map UV Error:", error.message);
    res.status(500).json({
      message: "Failed to fetch UV data",
    });
  }
});

module.exports = router;