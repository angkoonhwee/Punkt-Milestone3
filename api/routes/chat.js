const express = require('express');
const router = express.Router();
const Buddy = require("../models/buddy");
const Message = require('../models/message');
const Chat = require('../models/chat');

//@route   POST /chat/
//@desc    temporary create new chat method
//access   Private
router.post("/", async (req, res) => {
    const first = req.body.first;
    const second = req.body.second;

    try {
        const newChat = new Chat({
            buddyId: [first, second],
        });
        const buddyOne = await Buddy.findById(first);
        const buddyTwo = await Buddy.findById(second);
        const savedChat = await newChat.save();
        await buddyOne.updateOne({
            $set: { chatId: savedChat._id }
        });
        await buddyTwo.updateOne({
            $set: { chatId: savedChat._id }
        });
        res.status(200).json(savedChat);
    } catch (err) {
        console.log(err);
        res.status(200).json(chat);
    }
});

//@route   GET chat/:chatId
//@desc    get all chat messages
//access   Private
router.get("/:chatId", async (req, res) => {
    const chatId = req.params.chatId;

    try {
        const chat = await Chat.findById(chatId);
        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(200).json(chat);
    }
});

module.exports = router;
