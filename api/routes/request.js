const express = require('express');
const router = express.Router();
const Buddy = require('../models/buddy');
const Request = require('../models/request');
const User = require('../models/user');
const Chat = require('../models/chat');

//@route   POST /request
//@desc    send a request & make request object
//access   Private
router.post('/', async (req, res) => {
    const { sender, receiver } = req.body;

    try {
        const user = await User.findById(sender);
        const to = await User.findById(receiver);
        if (to.currentBuddy !== "") {
            return res.status(500).json("User already has a buddy!")
        }
        const newReq = new Request({
            sender: user,
            receiver: to
        });
        let savedReq = await newReq.save();
        
        await user.updateOne({
            $set: { request: savedReq }
        });

        await to.updateOne({
            $push: { requestedBy: savedReq }
        });
        savedReq = await Request.findById(savedReq._id)
                                .populate("sender", "username")
                                .populate("receiver", "username");
        res.status(200).json(savedReq);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

//@route   DELETE /request/:requestId
//@desc    delete request
//access   Private
router.delete('/:requestId', async (req, res) => {
    const { requestId } = req.params;

    try {
        const request = await Request.findById(requestId);
        const user = await User.findById(request.sender);
        const to = await User.findById(request.receiver);
        
        await user.updateOne({
            $set: { request: null }
        });

        const updated = to.requestedBy.filter(r => r._id.toString() !== requestId);
        await to.updateOne({
            $set: { requestedBy: updated }
        });

        await Request.deleteOne({ _id: requestId });

        res.status(200).json("Deleted request successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

//@route   GET /request/:requestId
//@desc    fetch particular request
//access   Private
router.get("/:requestId", async (req, res) => {
    const { requestId } = req.params;

    try {
        const req = await Request
                            .findById(requestId)
                            .populate("sender", "username")
                            .populate("receiver", "username");
        res.status(200).json(req);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

//@route   POST /request/:requestId/accept
//@desc    accept request, update users respectively and make buddy object
//access   Private
router.post("/:requestId/accept", async (req, res) => {
    const { requestId } = req.params;

    try {
        let request = await Request.findById(requestId);
        await request.updateOne({
            $set: { status: "Accepted" }
        });
        // console.log("update request status to accept");
        // console.log(request);
        const userOne = await User.findById(request.sender);
        // console.log("sender");
        // console.log(userOne);
        const userTwo = await User.findById(request.receiver);
        // console.log("receiver");
        // console.log(userTwo);

        //create chat object first
        const newChat = new Chat({
            buddyId: [userOne._id, userTwo._id],
        });
        const savedChat = await newChat.save();

        //create buddy object
        const budOne = new Buddy({
            user: userOne,
            buddy: userTwo,
            chatId: savedChat._id
        });
        const buddyOne = await budOne.save();
        await userOne.updateOne({
            $set: { currentBuddy: buddyOne._id }
        });
        await userOne.updateOne({
            $push: { buddyHistory: buddyOne._id }
        });

        const budTwo = new Buddy({
            user: userTwo,
            buddy: userOne,
            chatId: savedChat._id
        });
        const buddyTwo = await budTwo.save();
        await userTwo.updateOne({
            $set: { currentBuddy: buddyTwo._id }
        });
        await userTwo.updateOne({
            $push: { buddyHistory: buddyTwo._id }
        });

        //need to clear requestedBy array
        //user should not be able to see request anymore
        //all other requests rejected
        async function rejectAll(array) {
            for (let i = 0; i < array.length; i++) {
                const reject = array[i];
                // console.log(reject._id);
                // console.log(reject._id.toString());
                // console.log(requestId);
                if (reject._id.toString() !== requestId) {
                    const temp = await Request.findById(reject);
                    await temp.updateOne({
                        $set: { status: "Rejected" }
                    });
                    console.log(temp);
                }
            }
        }
        await rejectAll(userOne.requestedBy);
        await rejectAll(userTwo.requestedBy);
        await userOne.updateOne({
            $set: { requestedBy: [] }
        });
        await userTwo.updateOne({
            $set: { requestedBy: [] }
        });
        request = await Request.findById(requestId)
                               .populate("sender", "username")
                               .populate("receiver", "username");
        //console.log(request);
        res.status(200).json(request);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

//@route   PUT /request/:requestId/reject
//@desc    reject request and filter out user in requestedBy array
//access   Private
router.put("/:requestId/reject", async (req, res) => {
    const { requestId } = req.params;

    try {
        let request = await Request.findById(requestId);
        await request.updateOne({
            $set: { status: "Rejected" }
        });
        const to = await User.findById(request.receiver);
        const updated = to.requestedBy.filter(r => r._id.toString() !== requestId);
        await to.updateOne({
            $set: { requestedBy: updated }
        });

        request = await Request.findById(requestId)
                               .populate("sender", "username")
                               .populate("receiver", "username");
        
        res.status(200).json(request);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
});

//@route   GET /request/:userId/notifications
//@desc    get all requests requested to the particular user
//access   Private
router.get("/:userId/notifications", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        const result = [];
        const all = user.requestedBy;
        for (let i = 0; i < all.length; i++) {
            const temp = all[i];
            const tempUser = await User.findById(temp.sender);
            //console.log(temp);
            result.push({
                username: tempUser.username,
                requestId: temp._id
            });
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json("Server error");
    }
})

module.exports = router;