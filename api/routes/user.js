// jshint esversion: 8
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// GET USER
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    // const user = await User.findById(req.params.userId);
    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL USERS' USERNAME, PROFILE PIC, PRODUCTIVITY POINTS ARRAY
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}).select([
      "username",
      "profilePicture",
      "productivityPoints",
    ]);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  // console.log(req.body);
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only delete your account.");
  }
});

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId === req.params.id) {
    res.status(403).json("You cannot follow yourself");
  } else {
    try {
      const userToFollow = await User.findById(req.params.id);
      // const currUser = await User.findById(req.body.userId);

      if (!userToFollow.followers.includes(req.body.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        const updatedUser = await User.findByIdAndUpdate(
          req.body.userId,
          {
            $push: { followings: req.params.id },
          },
          { new: true }
        );

        res.status(200).json(updatedUser);
      } else {
        res.status(403).json("You are already following this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId === req.params.id) {
    res.status(403).json("You cannot unfollow yourself");
  } else {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      // const currUser = await User.findById(req.body.userId);

      if (userToUnfollow.followers.includes(req.body.userId)) {
        await userToUnfollow.updateOne({
          $pull: { followers: req.body.userId },
        });

        const updatedUser = await User.findByIdAndUpdate(
          req.body.userId,
          {
            $pull: { followings: req.params.id },
          },
          { new: true }
        );

        res.status(200).json(updatedUser);
      } else {
        res.status(403).json("You are not following this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// GET FOLLOWINGS
router.get("/followings/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const followings = await Promise.all(
      user.followings.map((followingId) => {
        return User.findById(followingId);
      })
    );

    let followingList = [];
    followings.map((f) => {
      const { _id, username, profilePicture } = f;
      followingList.push({ _id, username, profilePicture });
    });

    res.status(200).json(followingList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
