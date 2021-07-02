const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const Goal = require("../models/goal");
const Comment = require("../models/comment");
const Report = require("../models/report");

// CREATE REPORT
router.post("/", async (req, res) => {
  const newReport = new Report(req.body);

  try {
    const savedReport = await newReport.save();
    console.log("test");

    res.status(200).json(savedReport);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET REPORT BY REPORT ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL REPORTS FOR A POST
router.get("/post/:postId", async (req, res) => {
  try {
    const postReports = await Report.find({ postId: req.params.postId });

    res.status(200).json(postReports);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL REPORTS AGAINST A USER
router.get("/user/:userId", async (req, res) => {
  try {
    const postReports = await Report.find({ reportAgainst: req.params.userId });

    res.status(200).json(postReports);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
