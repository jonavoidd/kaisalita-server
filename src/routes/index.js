const express = require("express");
const router = express.Router();
const postRouter = require("./postRoutes");

router.use("/posts", postRouter);

router.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "success", success: true, message: "Server is running!" });
});

module.exports = router;
