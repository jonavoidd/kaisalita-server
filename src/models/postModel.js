const mongoose = require("mongoose");
const { z } = require("zod");

const postSchema = new mongoose.Schema(
  {
    submissionType: {
      type: String,
      required: true,
    },
    topicArea: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    publish: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const postZodSchema = z.object({
  submissionType: z.string(),
  topicArea: z.string(),
  content: z.string(),
  priority: z.string(),
  publish: z.boolean(),
});

module.exports = { Post: mongoose.model("Post", postSchema), postZodSchema };
