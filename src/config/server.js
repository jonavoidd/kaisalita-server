const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const AppError = require("../utils/appError");
const globalErrorHandler = require("../middleware/errorHandler");

const app = express();
const corsOption = {
  origin: ["http://localhost:5173", "https://kaisalita.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(cors(corsOption));

// security middleware
app.use(helmet());

// for rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP address. Try again in an hour.",
});
app.use("/api", limiter);

// body parser middleware
app.use(express.json({ limit: "10kb" }));

// routes
app.use("/api/v1", require("../routes"));

// handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
