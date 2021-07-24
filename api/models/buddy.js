const mongoose = require('mongoose');

const buddySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //The todos set the day before to be completed by today
    dailys: [
        {
            task: String,
            status: Array
        }
    ],
    //For you to set your todos for the next day
    todos: [
        {
            task: String,
            status: Array
        }
    ],
    //Buddy's userId to populate their dailys
    buddy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buddy',
        required: true
    },
    daysLeft: {
        type: Number,
        default: 30,
        required: true
    },
    chatId: {
        type: String,
        required: true
    }
},
{ timestamps: true }
);

const Buddy = new mongoose.model("Buddy", buddySchema);

module.exports = Buddy;