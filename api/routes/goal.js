const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Goal = require("../models/goal");

// CREATE GOAL
router.post("/", async (req, res) => {
  const newGoal = new Goal(req.body);

  try {
    // console.log("new goal id: " + newGoal._id);
    const user = await User.findById(req.body.userId);
    // console.log("newGoal: " + newGoal._id);

    await user.updateOne({
      $set: { goalId: newGoal._id },
    });

    const savedGoal = await newGoal.save();
    res.status(200).json(savedGoal);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET GOAL BY GOAL ID
router.get("/:id", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER GOAL
// router.get("/profile/:username", async (req, res) => {
//   // const currUser = User.findById(req.body.userId);
//   try {
//     // console.log(req.params.username);
//     const currUser = await User.findOne({ username: req.params.username });
//     const userGoal = await Goal.findOne({
//       userId: currUser._id,
//       status: "In Progress",
//     });
//     // console.log(userGoal);
//     if (userGoal) {
//       res.status(200).json(userGoal);
//     } else {
//       const sortGoalsByDate = await Goal.find({
//         userId: currUser._id,
//       }).sort({
//         createdAt: "-1",
//       });
//       // console.log(sortGoalsByDate);
//       res.status(200).json(sortGoalsByDate[0]);
//     }

//     // const allPosts = await Post.find();
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET THE LATEST USER GOAL BY USER ID
router.get("/user/:userId", async (req, res) => {
  // const currUser = User.findById(req.body.userId);
  try {
    const userGoal = await Goal.findOne({
      userId: req.params.userId,
      status: "In Progress",
    });
    // console.log(userGoal);
    if (userGoal) {
      res.status(200).json(userGoal);
    } else {
      const sortGoalsByDate = await Goal.find({
        userId: req.params.userId,
      }).sort({
        createdAt: "-1",
      });
      // console.log(sortGoalsByDate);
      res.status(200).json(sortGoalsByDate[0]);
    }

    // const allPosts = await Post.find();
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CURR USER'S BET AGAINST ON ANOTHER USER'S GOAL
router.get("/:goalId/bet-against/:userId", async (req, res) => {
  try {
    const userGoal = await Goal.findById(req.params.goalId);
    // console.log(userGoal);

    const currUserAgainst = await userGoal.usersBetAgainst.filter(
      (u) => u === req.params.userId
    )[0];

    res.status(200).json(currUserAgainst);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL GOALS BY USER ID
router.get("/user/:userId/all", async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL BETS BY USER ID
router.get("/user/:userId/bet", async (req, res) => {
  try {
    const goals = await Goal.find({ usersBetAgainst: req.params.userId });
    const goalsWithName = await Promise.all(
      goals.map((g) => {
        // console.log(g._doc);
        const { title, atonement, status, createdAt, _id, failedMessages } =
          g._doc;
        return User.findById(g.userId)
          .then((u) => {
            return {
              _id: _id,
              title: title,
              atonement: atonement,
              status: status,
              createdAt: createdAt,
              username: u.username,
              failedMessages: failedMessages,
            };
          })
          .catch((err) => console.log(err));
      })
    );
    res.status(200).json(goalsWithName);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USERS BET AGAINST ARRAY OF A GOAL
router.get("/:id/bet-against", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal.usersBetAgainst);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE BET AGAINST USERS
router.put("/:id/bet-against", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    // req.body should contain userId
    // update users who bet against this goal
    if (!goal.usersBetAgainst.includes(req.body.userId)) {
      await goal.updateOne({ $push: { usersBetAgainst: req.body.userId } });

      // update user's goal bets against
      await user.updateOne({
        $push: { betAgainst: req.params.id },
      });
      res.status(200).json("You have successfully bet against this goal.");
    } else {
      res.status(200).json("You have already bet against this goal.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE PROGRESS STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    if (req.body.status === "Success") {
      console.log("success status block");

      // push goalId into goal history arr of user
      await user.updateOne({ $push: { goalHistory: req.params.id } });

      // clear curr goal id of user
      await user.updateOne({ $set: { goalId: "" } });

      // calculate & update productivity points of user
      const numUsersAgainst = goal.usersBetAgainst.length;

      const productivityPoints = numUsersAgainst * 10 + 10;
      await user.updateOne({
        $inc: { productivityPoints: productivityPoints },
      });

      // update goal status
      await goal.updateOne({ $set: { status: req.body.status } });

      // update ranking: sort all users based on productivity points
      const sortedUsersByPoints = await User.find().sort({
        productivityPoints: "-1",
      });

      const updateRank = await Promise.all(
        sortedUsersByPoints.map((u, index) => {
          return u.updateOne({ $set: { rank: index + 1 } });
        })
      );
      // console.log(updateRank);

      // update user bet against data
      const updateUsersBetAgainstData = await Promise.all(
        goal.usersBetAgainst.map((userBetAgainst) => {
          // pull this goal from currUser's bet against arr
          // push this goal into currUser's bet history arr
          return User.bulkWrite([
            {
              updateOne: {
                filter: { _id: userBetAgainst },
                update: { $pull: { betAgainst: req.params.id } },
              },
            },
            {
              updateOne: {
                filter: { _id: userBetAgainst },
                update: {
                  $push: {
                    betHistory: {
                      goalId: req.params.id,
                      status: "Lost",
                    },
                  },
                },
              },
            },
          ]);
        })
      );
      // console.log(updateUsersBetAgainstData);
      res.status(200).json(user);
    } else if (req.body.status === "Failed") {
      console.log("failed status block");
      // failed goals dont need update productivity points & ranking

      // push goalId into goal history arr of user
      await user.updateOne({ $push: { goalHistory: req.params.id } });

      // clear curr goal id of user
      await user.updateOne({ $set: { goalId: "" } });

      // update goal status
      await goal.updateOne({ $set: { status: req.body.status } });

      // update users bet against data --> win
      await Promise.all(
        // for all users who bet against this goal
        goal.usersBetAgainst.map((userBetAgainst) => {
          // pull this completed goal from currUser's betFor goal arr
          // push this completed goal into currUser's bet history arr
          return User.bulkWrite([
            {
              updateOne: {
                filter: { _id: userBetAgainst },
                update: { $pull: { betAgainst: req.params.id } },
              },
            },
            {
              updateOne: {
                filter: { _id: userBetAgainst },
                update: {
                  $push: {
                    betHistory: {
                      goalId: req.params.id,
                      status: "Victory",
                    },
                  },
                },
              },
            },
          ]);
        })
      );
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE FAILED MESSAGES ARRAY WHEN BET USERS REPLY THIS LOST BET
router.put("/failed-messages/:id", async (req, res) => {
  try {
    // const goal = await Goal.findById(req.params.id);
    // await goal.updateOne({ $push: { failedMessages: req.body } });
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $push: { failedMessages: req.body } },
      { new: true }
    );

    const userMessages = await goal.failedMessages.filter(
      (msg) => msg.userId === req.body.userId
    );

    res.status(200).json(userMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FAILED MESSAGES ARRAY FOR A USER
router.get("/failed-messages/:goalId/:userId", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);
    const userMessages = await goal.failedMessages.filter(
      (msg) => msg.userId === req.params.userId
    );

    res.status(200).json(userMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
