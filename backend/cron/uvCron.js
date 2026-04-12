const cron = require("node-cron");
const UVData = require("../models/UVData");
const { fetchUV } = require("../services/uvService");
const LOCATIONS = require("../config/locations");

const startUVCron = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Running UV cron...");

   for (const loc of LOCATIONS) {
  const uv = await fetchUV(loc.lat, loc.lng);

  if (uv !== null) {
    await UVData.findOneAndUpdate(
      { city: loc.name },

      {
        $push: {
          data: {
            uv,
            timestamp: new Date(),
          },
        },
      },

      {
        upsert: true,
        new: true,
      }
    );

    // KEEP ONLY LAST 10 VALUES
    await UVData.updateOne(
      { city: loc.name },
      {
        $push: {
          data: {
            $each: [],
            $slice: -10,
          },
        },
      }
    );

    console.log(`Updated ${loc.name}: ${uv}`);
  }
}
  });
};

module.exports = { startUVCron };