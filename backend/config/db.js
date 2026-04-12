const mongoose = require("mongoose");
const { startUVCron } = require("../cron/uvCron");
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    startUVCron(); 
}
module.exports = connectDB;