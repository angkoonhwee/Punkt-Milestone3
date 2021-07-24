const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 500,
      required: true,
    },
    numDays: {
      type: Number,
      required: true,
    },
    atonement: {
      type: String,
    },
    postIds: {
      type: Array,
      default: [],
    },
    madeAtonement: {
      type: Boolean,
      default: false,
    },
    // usersBetFor: {
    //   type: [{ userId: String, amt: Number }],
    //   default: [],
    // },
    usersBetAgainst: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      default: "In Progress",
    },
    failedMessages: [
      {
        userId: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);