const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
      // required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    bio: String,
    education: {
      school: String,
      major: String,
      yearOfStudy: Number,
      currentModules: [String],
    },
    social: {
      instagram: String,
      github: String,
      linkedIn: String,
    },

    betHistory: {
      type: [String], // ARRAY OF GOAL IDs
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    productivityPoints: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 9999,
    },
    betAgainst: {
      type: [String],
      default: [],
    },
    buddyHistory: {
      type: Array,
      default: [],
    },
    goalId: {
      type: String,
      default: "",
    },
    goalHistory: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    //currentBuddy stores a buddy object that belongs to user
    currentBuddy: {
      type: String,
      default: ""
    },
    request: {
      type: mongoose.Types.ObjectId,
      default: null
    },
    requestedBy: {
      type: Array,
      default: []
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = User;