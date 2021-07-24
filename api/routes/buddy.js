const express = require('express');
const router = express.Router();
const Buddy = require('../models/buddy');
const User = require('../models/user');

//@route   POST /buddy/:buddyUsername
//@desc    create buddy pair **add friend request function later
//access   Private
router.post('/:buddyUsername', async (req, res) => {
    //your buddy's username
    const buddyUsername = req.params.buddyUsername;
    //your own userId
    const userId = req.body.userId;

    try {
        const buddy = await User.findOne({ username: buddyUsername });
        const user = await User.findById(userId);

        const newBuddy = new Buddy({
            user: user,
            buddy: buddy
        });

        await user.updateOne({
            $set: { currentBuddy: newBuddy._id },
        });

        const savedBuddy = await newBuddy.save();
        
        res.status(200).json(savedBuddy);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

//@route   GET /buddy/:buddyObjectId
//@desc    get buddy object for default page
//access   Private
router.get('/:buddyObjectId', async (req, res) => {
    const buddyId = req.params.buddyObjectId;

    try {
        const buddy = await Buddy.findById(buddyId);
        res.status(200).json(buddy);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    } 
});

/*********************BUDDY REQUEST SECTION*************************/


/***********************DAILYS SECTION*****************************/

//@route   GET buddy
//@desc    get buddy's dailys
//access   Private
router.get('/:userId/dailys', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await Buddy.findOne({ user: userId });
        const buddyId = user.buddy;
        const buddy = await Buddy.findOne({ user: buddyId});
        const dailys = {
            user: user.dailys,
            buddy: buddy.dailys
        }
        res.status(200).json(dailys);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

//@route   PUT /buddy/:userId/dailys
//@desc    toggle task to completed
//access   Private
router.put('/:todoId/dailys', async (req, res) => {
    const todoId = req.params.todoId;
    const { userId, state } = req.body;

    try {
        const buddy = await Buddy.findOne({ user: userId });
        const prev = buddy.dailys.filter(d => d._id.toString() === todoId);
        console.log(prev);
        if (state[0] === "incomplete") {
            await Buddy.updateOne(
                { user: userId, "dailys._id": todoId },
                { $set: {"dailys.$.status": ["completed", prev[0].status[1]] }}
            );
        } else {
            await Buddy.updateOne(
                { user: userId, "dailys._id": todoId },
                { $set: {"dailys.$.status": ["incomplete", prev[0].status[1]] }}
            );
        }
        const user = await Buddy.findOne({ user: userId });
        res.status(200).json(user.dailys);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

/***********************TODOS SECTION*****************************/

//@route   POST buddy/todos/add
//@desc    add todos to setTodos page
//access   Private
router.post('/todos/add', async (req, res) => {
    const userId = req.body.userId;
    const add = req.body.task;
    
    try {
        var buddy = await Buddy.findOne({ user: userId });
        const newTask = {
            task: add,
            status: ['incomplete', 'on time']
        }
        await buddy.updateOne({ $push: { todos: newTask }});

        buddy = await Buddy.findOne({ user: userId });
        res.status(200).json(buddy.todos);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server error');
    }
});

//@route   DELETE buddy/:todos/delete
//@desc    delete a particular todo
//access   Private
router.delete('/:todoId/delete', async (req, res) => {
    const todoId = req.params.todoId;
    const userId = req.body.userId;
    try {
        var buddy = await Buddy.findOne({ user: userId });
        console.log(buddy);
        await buddy.updateOne({ $pull: {todos: { _id: todoId }}});
        buddy = await Buddy.findOne({ user: userId });

        res.status(200).json(buddy.todos);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Server Error')
    }
});

//@route   GET buddy/todos
//@desc    get all todos
//access   Private
router.get('/todos', async (req, res) => {
    const userId = req.body.userId;

    try {
        const buddy = await Buddy.findOne({ user: userId });
        res.status(200).json(buddy.todos);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Server Error');
    }
});

/***********************HISTORY SECTION*****************************/
//@route   GET buddy/:userId/buddyHistory
//@desc    get buddy history
//access   Private
router.get("/:userId/buddyHistory", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        const result = [];
        const all = user.buddyHistory;
        for (let i = 0; i < all.length; i++) {
            const temp = all[i];
            const tempBuddy = await Buddy.findById(temp)
            const buddy = await User.findById(tempBuddy.buddy)
            //console.log(tempBuddy);
            result.push({
                username: buddy.username,
                _id: tempBuddy._id,
                createdAt: tempBuddy.createdAt
            });
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

//Test update route
router.post("/test/update", async (req, res) => {
    try {
        console.log("START UPDATES");
        var allBuddies = await Buddy.find();
        const promises = allBuddies.map(async buddy => {
            
            if (buddy.daysLeft >= 0) {
              //update days left first
              const end = buddy.daysLeft - 1;
              //only update if buddy has not ended
              await buddy.update({ $set: { daysLeft: end}});
              if (end < 0) {
                console.log(buddy.daysLeft);
                //when end is less than 0 clear currentBuddy
                const user = await User.findById(buddy.user);
                await user.updateOne({
                  $set: { currentBuddy: "" }
                });
                const buddyUser = await User.findById(buddy.buddy);
                await buddyUser.updateOne({
                  $set: { currentBuddy: "" }
                });
              }
              if (buddy.dailys.length > 0) {
                  const cleared = buddy.dailys.filter(d => d.status[0] !== "completed");
                  console.log("filtered");
                  console.log(cleared);
                  cleared.map(daily => {
                      if (daily.status[0] === "incomplete") {
                          daily.status[1] = "late";
                      }
                      //console.log(daily);
                  });
                  console.log("after updating incomplete to late");
                  await buddy.updateOne({ $set: { dailys: cleared }});
              }
              const todos = buddy.todos;
              await buddy.update({ $push: { dailys: todos }});
              await buddy.update({ $set: { todos: [] }});
            }
        });
        await Promise.all(promises);
        allBuddies = await Buddy.find();
        console.log("DATA UPDATED");
        res.status(200).json(allBuddies);
      } catch (err) {
          console.log(err);
          return res.status(500).json('Server Error');
      }
})

module.exports = router;

