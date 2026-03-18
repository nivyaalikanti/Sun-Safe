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


require("./cron/uvMonitor");

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
