const axios = require("axios");

const fetchUV = async (lat, lng) => {
  try {
    const res = await axios.get(
      "https://api.openuv.io/api/v1/uv",
      {
        params: { lat, lng },
        headers: {
          "x-access-token": process.env.OPENUV_API_KEY,
        },
      }
    );

    return res.data.result.uv;
  } catch (err) {
    console.error("UV API error:", err.message);
    return null;
  }
};

module.exports = { fetchUV };