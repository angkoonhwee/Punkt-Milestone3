const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Goal = require("../models/goal");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    // console.log(savedPost);
    // const currGoal = Goal.findById(req.body.goalId);
    // await currGoal.updateOne(
    //   { $push: { postIds: savedPost.id } },
    //   { $set: { madeAtonement: req.body.atonement } }
    // );

    await Goal.bulkWrite([
      {
        updateOne: {
          filter: { _id: req.body.goalId },
          update: { $push: { postIds: savedPost.id } },
        },
      },
      {
        updateOne: {
          filter: { _id: req.body.goalId },
          update: { $set: { madeAtonement: req.body.atonement } },
        },
      },
    ]);

    // if (req.body.atonement) {
    //   await currGoal.updateOne({ $set: { madeAtonement: true } });
    // }

    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    // json(err.message)
    res.status(500).json(err);
  }
});

// GET A POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER POSTS
router.get("/profile/:username", async (req, res) => {
  // const currUser = User.findById(req.body.userId);
  try {
    const currUser = await User.findOne({ username: req.params.username });
    const userPosts = await Post.find({ userId: currUser._id });

    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POSTS OF A GOAL
router.get("/goal/:goalId", async (req, res) => {
  try {
    const currGoal = await Goal.findById(req.params.goalId);
    const goalPosts = await Post.find({ goalId: currGoal._id });

    res.status(200).json(goalPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FOLLOWING POSTS & USER POSTS
router.get("/main/:userId", async (req, res) => {
  // const currUser = User.findById(req.body.userId);
  try {
    const currUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currUser._id });
    const friendPosts = await Promise.all(
      currUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    // const allPosts = await Post.find();
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SPECULATING POSTS (BET FOR AND BET AGAINST)
router.get("/speculate/:userId", async (req, res) => {
  try {
    const goalsBetAgainst = await Goal.find({
      usersBetAgainst: req.params.userId,
    });

    const allSpeculatePosts = await Promise.all(
      goalsBetAgainst.map((goal) => {
        return Post.find({ goalId: goal._id });
      })
    );
    const flattenedPosts = allSpeculatePosts.flat();

    res.status(200).json(flattenedPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ATONEMENT POST
router.get("/atonement/:goalId", async (req, res) => {
  try {
    const post = await Post.findOne({
      goalId: req.params.goalId,
      atonement: true,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json("The post you are requesting does not exist.");
    } else if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated.");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const currGoal = await Goal.findById(post.goalId);
    const user = await User.findOne({ goalId: post.goalId });

    if (!post) {
      res.status(404).json("The post you are requesting does not exist.");
    } else if (post.userId === req.body._id) {
      if (post.atonement) {
        // post is an atonement post, when deleting, also need to reset currGoal madeAtonement to false
        await currGoal.updateOne({ $set: { madeAtonement: false } });
      }
      await post.deleteOne();
      await currGoal.updateOne({ $pull: { postIds: req.params.id } });
      res.status(200).json("Post has been deleted.");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIKE POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.lits.includes(req.body.userId)) {
      await post.updateOne({ $pull: { lits: req.body.userId } });
      res.status(200).json("The post has been unliked");
    } else {
      await post.updateOne({ $push: { lits: req.body.userId } });
      res.status(200).json("The post has been liked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
