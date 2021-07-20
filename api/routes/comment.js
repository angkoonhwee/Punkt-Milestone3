const express = require("express");
const router = express.Router();
const Post = require("../models/post");
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

module.exports = router;