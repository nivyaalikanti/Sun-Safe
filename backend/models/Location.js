const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    latKey: Number,
    lonKey: Number,
    lastUV: Number,
    lastChecked: Date
});
module.exports = mongoose.model("Location", locationSchema);