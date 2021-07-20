const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Goal = require("../models/goal");
const Comment = require("../models/comment");

// CREATE COMMENT
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);

  try {
    const savedComment = await newComment.save();
    // console.log(savedPost);
    const currPost = Post.findById(req.body.postId);
    await currPost.updateOne({ $push: { comments: savedComment.id } });

    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET COMMENT BY COMMENT ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL COMMENTS FOR A POST
router.get("/post/:postId", async (req, res) => {
  try {
    const postComments = await Comment.find({ postId: req.params.postId });

    res.status(200).json(postComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIKE COMMENT
router.put("/:id/like", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The comment has been unliked");
    } else {
      await comment.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The comment has been liked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL COMMENTS ON POSTS CREATED BY A USER
router.get("/user/:userId", async (req, res) => {
  try {
    const postsByUser = await Post.find({ userId: req.params.userId });

    // for all posts, find all comments
    const commentsWithNames = await Promise.all(
      postsByUser.map(async (post) => {
        // post.comments is an array of comment ids
        const comments = await Comment.find({ postId: post.id }) //array of comments
          .select(["userId", "postId", "createdAt"])
          .then(async (comms) => {
            return await Promise.all(
              comms.map(async (c) => {
                const user = await User.findById(c.userId);
                const post = await Post.findById(c.postId);

                return {
                  postId: c.postId,
                  goalId: post.goalId,
                  desc: post.desc,
                  createdAt: c.createdAt,
                  username: user.username,
                };
              })
            );
          });

        return comments;
      })
    );
    res.status(200).json(commentsWithNames.flat());
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;