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
router.get("/profile/:username", async (req, res) => {
  // const currUser = User.findById(req.body.userId);
  try {
    // console.log(req.params.username);
    const currUser = await User.findOne({ username: req.params.username });
    const userGoal = await Goal.findOne({
      userId: currUser._id,
      status: "In Progress",
    });
    // console.log(userGoal);
    if (userGoal) {
      res.status(200).json(userGoal);
    } else {
      const sortGoalsByDate = await Goal.find({
        userId: currUser._id,
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

// GET USER GOAL BY USER ID
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

// GET CURR USER'S BET ON ANOTHER USER'S GOAL
router.get("/:goalId/bet-for/:userId", async (req, res) => {
  try {
    const userGoal = await Goal.findById(req.params.goalId);
    // console.log(userGoal);
    const currUserFor = await userGoal.usersBetFor.filter(
      (u) => u.userId === req.params.userId
    )[0];

    // user has not bet on this goal
    res.status(200).json(currUserFor);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:goalId/bet-against/:userId", async (req, res) => {
  try {
    const userGoal = await Goal.findById(req.params.goalId);
    // console.log(userGoal);

    const currUserAgainst = await userGoal.usersBetAgainst.filter(
      (u) => u.userId === req.params.userId
    )[0];

    res.status(200).json(currUserAgainst);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USERS BET FOR & INDIV AMT
router.get("/:id/bet-for", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal.usersBetFor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USERS BET AGAINST & INDIV AMT
router.get("/:id/bet-against", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.status(200).json(goal.usersBetFor);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE AMT BET FOR
router.put("/:id/bet-for", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    // req.body should contain userId and amount
    // update users who bet for this goal
    await goal.updateOne({ $push: { usersBetFor: req.body } });

    // update total bet for amt for this goal
    await goal.updateOne({ $inc: { amtBetFor: req.body.amt } });

    // update user's goal bets for
    await user.updateOne({
      $push: { betFor: { goalId: req.params.id, amt: req.body.amt } },
    });

    res.status(200).json("You have successfully bet for this goal.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE AMT BET AGAINST
router.put("/:id/bet-against", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    // req.body should contain userId and amount
    // update users who bet against this goal
    await goal.updateOne({ $push: { usersBetAgainst: req.body } });

    // update total bet against amt for this goal
    await goal.updateOne({ $inc: { amtBetAgainst: req.body.amt } });

    // update user's goal bets against
    await user.updateOne({
      $push: { betAgainst: { goalId: req.params.id, amt: req.body.amt } },
    });

    res.status(200).json("You have successfully bet against this goal.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE PROGRESS STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    // const totalAmtBetFor = goal.usersBetFor.reduce(
    //   (accumulator, currentValue) => {
    //     return { amt: accumulator.amt + currentValue.amt };
    //   }
    // );
    // const totalAmtBetFor = goal.amtBetFor;

    // const totalAmtBetAgainst = goal.amtBetAgainst;

    if (req.body.status === "Success") {
      console.log("success status block");
      // push goalId into goal history arr of user
      await user.updateOne({ $push: { goalHistory: req.params.id } });

      // clear curr goal id of user
      await user.updateOne({ $set: { goalId: "" } });

      // calculate & update productivity points of user
      const numUsersAgainst = goal.usersBetAgainst.length;
      const numUsersFor = goal.usersBetFor.length;
      const totalBetters = numUsersAgainst + numUsersFor + 1;
      const productivityPoints = (numUsersAgainst / totalBetters) * 100 + 10;
      await user.updateOne({
        $inc: { productivityPoints: productivityPoints },
      });

      // calculate own nett amt won
      const nettWinning =
        (goal.betAmount / (goal.betAmount + goal.amtBetFor)) *
        goal.amtBetAgainst; // additional winning

      // update own user's total amt won
      await user.updateOne({
        $inc: { totalAmtWon: nettWinning, currAmt: nettWinning },
      });

      // update goal nett amt
      await goal.updateOne({ $set: { nettAmt: nettWinning } });

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

      // update users bet for data
      const updateUsersBetForData = await Promise.all(
        // for all users who bet for this goal
        goal.usersBetFor.map((userBetFor) => {
          // calculate indiv nett amt won
          const amtWon =
            (userBetFor.amt / (goal.betAmount + goal.amtBetFor)) *
            goal.amtBetAgainst; // additional winning

          // increase total amt won by and curr amt of this user
          // pull this completed goal from currUser's betFor goal arr
          // push this completed goal into currUser's bet history arr
          return User.bulkWrite([
            {
              updateOne: {
                filter: { _id: userBetFor.userId },
                update: { $inc: { totalAmtWon: amtWon, currAmt: amtWon } },
              },
            },
            {
              updateOne: {
                filter: { _id: userBetFor.userId },
                update: { $pull: { betFor: { goalId: req.params.id } } },
              },
            },
            {
              updateOne: {
                filter: { _id: userBetFor.userId },
                update: {
                  $push: {
                    betHistory: {
                      goalId: req.params.id,
                      amt: amtWon,
                      status: "Victory",
                    },
                  },
                },
              },
            },
          ]);
        })
      );
      // console.log(updateUsersBetForData);

      // update user bet against data
      const updateUsersBetAgainstData = await Promise.all(
        goal.usersBetAgainst.map((userBetAgainst) => {
          // increment amt lost by the amt bet by user, decrement user's curr amt
          // pull this goal from currUser's bet against arr
          // push this goal into currUser's bet history arr
          return User.bulkWrite([
            {
              updateOne: {
                filter: { _id: userBetAgainst.userId },
                update: {
                  $inc: {
                    totalAmtLost: userBetAgainst.amt,
                    currAmt: -userBetAgainst.amt,
                  },
                },
              },
            },
            {
              updateOne: {
                filter: { _id: userBetAgainst.userId },
                update: { $pull: { betAgainst: { goalId: req.params.id } } },
              },
            },
            {
              updateOne: {
                filter: { _id: userBetAgainst.userId },
                update: {
                  $push: {
                    betHistory: {
                      goalId: req.params.id,
                      amt: -userBetAgainst.amt,
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
    } else if (req.body.status === "Failed") {
      console.log("failed status block");
      // failed goals dont need update productivity points & ranking

      // push goalId into goal history arr of user
      await user.updateOne({ $push: { goalHistory: req.params.id } });

      // clear curr goal id of user
      await user.updateOne({ $set: { goalId: "" } });

      if (goal.usersBetAgainst.length === 0) {
        // consider the case where user failed but no one bet against as a draw case => all users to get back their own money
        // no need to update users' total amt lost/win, curr amt, goal nett amt (default 0)

        // update goal status
        await goal.updateOne({ $set: { status: "Draw" } });

        // update users bet for data
        await Promise.all(
          // for all users who bet for this goal
          goal.usersBetFor.map((userBetFor) => {
            // pull this goal from currUser's bet for arr
            // push this goal into currUser's bet history arr
            return User.bulkWrite([
              {
                updateOne: {
                  filter: { _id: userBetFor.userId },
                  update: { $pull: { betFor: { goalId: req.params.id } } },
                },
              },
              {
                updateOne: {
                  filter: { _id: userBetFor.userId },
                  update: {
                    $push: {
                      betHistory: {
                        goalId: req.params.id,
                        amt: 0,
                        status: "Draw",
                      },
                    },
                  },
                },
              },
            ]);
          })
        );

        // update users bet against data
        await Promise.all(
          // for all users who bet for this goal
          goal.usersBetAgainst.map((userBetAgainst) => {
            // pull this goal from currUser's bet against arr
            // push this goal into currUser's bet history arr
            return User.bulkWrite([
              {
                updateOne: {
                  filter: { _id: userBetAgainst.userId },
                  update: { $pull: { betAgainst: { goalId: req.params.id } } },
                },
              },
              {
                updateOne: {
                  filter: { _id: userBetAgainst.userId },
                  update: {
                    $push: {
                      betHistory: {
                        goalId: req.params.id,
                        amt: 0,
                        status: "Draw",
                      },
                    },
                  },
                },
              },
            ]);
          })
        );
      } else {
        // update own user total amount lost = original bet amt
        await user.updateOne({
          $inc: { totalAmtLost: goal.betAmount, currAmt: -goal.betAmount },
        });

        // update goal nett amt
        await goal.updateOne({ $set: { nettAmt: -goal.betAmount } });

        // update goal status
        await goal.updateOne({ $set: { status: req.body.status } });

        // update users bet for data -> lose money
        await Promise.all(
          // for all users who bet for this goal
          goal.usersBetFor.map((userBetFor) => {
            // increment amt lost by the amt bet by user, decrement user's curr amt
            // pull this goal from currUser's bet for arr
            // push this goal into currUser's bet history arr
            return User.bulkWrite([
              {
                updateOne: {
                  filter: { _id: userBetFor.userId },
                  update: {
                    $inc: {
                      totalAmtLost: userBetFor.amt,
                      currAmt: -userBetFor.amt,
                    },
                  },
                },
              },
              {
                updateOne: {
                  filter: { _id: userBetFor.userId },
                  update: { $pull: { betFor: { goalId: req.params.id } } },
                },
              },
              {
                updateOne: {
                  filter: { _id: userBetFor.userId },
                  update: {
                    $push: {
                      betHistory: {
                        goalId: req.params.id,
                        amt: -userBetFor.amt,
                        status: "Lost",
                      },
                    },
                  },
                },
              },
            ]);
          })
        );

        // update users bet against data --> win money
        await Promise.all(
          // for all users who bet against this goal
          goal.usersBetAgainst.map((userBetAgainst) => {
            // calculate indiv nett amt won
            const amtWon =
              (userBetAgainst.amt / goal.amtBetAgainst) *
              (goal.amtBetFor + goal.betAmount); // additional winning

            // increase total amt won by and curr amt of this user
            // pull this completed goal from currUser's betFor goal arr
            // push this completed goal into currUser's bet history arr
            return User.bulkWrite([
              {
                updateOne: {
                  filter: { _id: userBetAgainst.userId },
                  update: {
                    $inc: { totalAmtWon: amtWon, currAmt: amtWon },
                  },
                },
              },
              {
                updateOne: {
                  filter: { _id: userBetAgainst.userId },
                  update: { $pull: { betAgainst: { goalId: req.params.id } } },
                },
              },
              {
                updateOne: {
                  filter: { _id: userBetAgainst.userId },
                  update: {
                    $push: {
                      betHistory: {
                        goalId: req.params.id,
                        amt: amtWon,
                        status: "Victory",
                      },
                    },
                  },
                },
              },
            ]);
          })
        );
      }
    }

    res.status(200).json("goal has been successfully updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
