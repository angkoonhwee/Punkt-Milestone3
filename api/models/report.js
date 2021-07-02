const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportBy: {
      type: String,
      required: true,
    },
    reportAgainst: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      max: 500,
    },
    isSettled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
