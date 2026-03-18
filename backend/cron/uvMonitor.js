const cron = require("node-cron");
const User = require("../models/User");
const Location = require("../models/Location");
const { getUVIndex } = require("../services/openuvService");
const { sendSMS } = require("../services/smsService");

// const COOLDOWN = 1 * 60 * 1000; // 1 min
const COOLDOWN = 2 * 60 * 60 * 1000; // 2 hours

cron.schedule("*/30 * * * *", async () => {
  console.log("Running UV check...");

  const users = await User.find({ isActive: true });
  console.log("users: ", users.length);
  const groups = {};

  users.forEach(user => {
    // console.log("Processing User", user.phone);
    const latKey = Number(user.latitude.toFixed(2));
    const lonKey = Number(user.longitude.toFixed(2));
    const key = `${latKey},${lonKey}`;

    if (!groups[key]) groups[key] = [];
    groups[key].push(user);
  });

  for (const key in groups) {
    const [lat, lon] = key.split(",");

    const uv = await getUVIndex(lat, lon);

    await Location.findOneAndUpdate(
        { latKey: Number(lat), lonKey: Number(lon) },
        {
            latKey: Number(lat),
            lonKey: Number(lon),
            lastUV: uv,
            lastChecked: new Date()
        },
        { upsert: true }
    );


    for (const user of groups[key]) {
      const now = Date.now();
      const last = user.lastAlertSent?.getTime() || 0;

      if (uv >= user.uvThreshold && now - last >= COOLDOWN) {
        
        await sendSMS(
          user.phone,
          `☀️ Sun Safe Alert!\nUV Index is ${uv.toFixed(
            1
          )} `
        );

        user.lastAlertSent = new Date();
        await user.save();
      }
    }
  }
});
