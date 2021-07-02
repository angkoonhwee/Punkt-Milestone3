const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    goalId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: Array,
      default: [],
    },
    lits: {
      type: Array,
      default: [],
    },
    // comments: [
    //   {
    //     userId: String,
    //     comment: String,
    //     numLikes: Array,
    //     createdAt: Date,
    //   },
    // ],
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
