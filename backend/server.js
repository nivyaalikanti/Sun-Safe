require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const cors = require("cors");
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/userRoutes"));
app.use("/api/uv", require("./routes/uvRoutes"));
const mapRoutes = require("./routes/mapRoutes");
app.use("/api/map", mapRoutes);
app.get("/api/map/uv-history", (req, res) => {
  const sampleData = [
    { time: "6 AM", uv: 1 },
    { time: "8 AM", uv: 3 },
    { time: "10 AM", uv: 6 },
    { time: "12 PM", uv: 9 },
    { time: "2 PM", uv: 8 },
    { time: "4 PM", uv: 5 },
    { time: "6 PM", uv: 2 },
  ];

  res.json(sampleData);
});

require("./cron/uvMonitor");

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
