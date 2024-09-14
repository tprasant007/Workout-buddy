const express = require("express");
const mongoose = require("mongoose");

// load the environment varables from .env file
require("dotenv").config();

// routes
const routes = require("./routes/woRoutes");
const userRoutes = require("./routes/user");
const cors = require("cors");

// using express
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

// middlewares
app.use(express.json());
app.use(cors());

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on a port: ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/api/workouts", routes);
app.use("/api/user", userRoutes);
