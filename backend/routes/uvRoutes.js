const express = require("express");
const axios = require("axios");
const router = express.Router();

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
