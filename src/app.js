const app = require("./config/server");

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode.`
  );
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTIONS! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

module.exports = app;
