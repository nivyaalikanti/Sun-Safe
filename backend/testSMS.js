require("dotenv").config();
const { sendSMS } = require("./services/smsService");

sendSMS(
  "+918121432219",
  "🔥 Test SMS from SunSafe"
);
