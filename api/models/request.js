const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  status: {
      type: String,
      //"Pending", "Accepted", "Rejected"
      default: "Pending",
      required: true
  },
  //id of user that sent the request
  sender: {
      type: mongoose.Types.ObjectId,
      default: null,
      required: true,
      ref: "User"
  },
  receiver: {
      type: mongoose.Types.ObjectId,
      default: null,
      required: true,
      ref: "User"
  }
});

const Request = new mongoose.model("Request", requestSchema);

module.exports = Request;