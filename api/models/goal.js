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
    // betAmount: {
    //   type: Number,
    //   required: true,
    // },
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
    // amtBetFor: {
    //   type: Number,
    //   default: 0,
    // },
    // amtBetAgainst: {
    //   type: Number,
    //   default: 0,
    // },
    status: {
      type: String,
      default: "In Progress",
    },
    // nettAmt: {
    //   type: Number,
    //   default: 0,
    // },
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
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
