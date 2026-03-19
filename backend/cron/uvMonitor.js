const cron = require("node-cron");
const User = require("../models/User");
const Location = require("../models/Location");
const { getUVIndex } = require("../services/openuvService");
const { sendSMS } = require("../services/smsService");
const { sendEmail } = require("../services/emailService");

const COOLDOWN = 1 * 60 * 1000; // 1 min
// const COOLDOWN = 2 * 60 * 60 * 1000; // 2 hours

cron.schedule("* * * * *", async () => {
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
        try {
          const alertMsg = `${user.name}, Sun Safe Alert!\\nUV Index is ${uv.toFixed(1)}`;
          await sendSMS(user.phone, alertMsg.replace('\\\\n', '\\n'));
          
          if (user.email) {
            await sendEmail(
              user.email,
              'SunSafe UV Alert!',
              `<h3>${user.name}, SunSafe Alert!</h3>
<p>UV Index is <strong>${uv.toFixed(1)}`
            );
          }
          console.log(`Alert sent to ${user.phone} and ${user.email || 'no email'}`);
        } catch (err) {
          console.error(`Alert failed for ${user.phone} (${user.email || 'no email'}):`, err.message);
        }

        user.lastAlertSent = new Date();
        await user.save();
      }
    }
  }
});

