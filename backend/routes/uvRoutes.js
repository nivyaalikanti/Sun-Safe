const express = require("express");
const axios = require("axios");
const router = express.Router();
const UVData = require("../models/UVData");

// GET: /api/map/uv-history?city=Hyderabad
router.get("/history", async (req, res) => {
  const { city } = req.query;

  const record = await UVData.findOne({ city });

  if (!record) return res.json([]);

  const formatted = record.data.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    uv: item.uv,
  }));

  res.json(formatted);
});

router.get("/", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(
      "https://api.openuv.io/api/v1/uv",
      {
        params: { lat, lng },
        headers: {
          "x-access-token": process.env.OPENUV_API_KEY
        }
      }
    );

    res.json(response.data.result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch UV data" });
  }
});

module.exports = router;
