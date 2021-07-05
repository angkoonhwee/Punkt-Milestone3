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
    school: String,
    major: String,
    yearOfStudy: Number,
    currentModules: [String],
    instagram: String,
    github: String,
    linkedIn: String,
    betHistory: {
      type: [{ goalId: String, status: String }],
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
    // currAmt: {
    //   type: Number,
    //   default: 0,
    // },
    // totalAmtWon: {
    //   type: Number,
    //   default: 0,
    // },
    // totalAmtLost: {
    //   type: Number,
    //   default: 0,
    // },
    // betFor: {
    //   type: [{ goalId: String, amt: Number }],
    //   default: [],
    // },
    // betAgainst: {
    //   type: [String],
    //   default: [],
    // },
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

    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = User;
