const mongoose = require("mongoose");

const uvSchema = new mongoose.Schema({
  city: { type: String, unique: true },
  data: [
    {
      uv: Number,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("UVData", uvSchema);