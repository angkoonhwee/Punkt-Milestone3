require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const goalRoute = require("./routes/goal");
const contactRoute = require("./routes/contact");
const commentRoute = require("./routes/comment");
const reportRoute = require("./routes/report");
const buddyRoute = require("./routes/buddy");
const messageRoute = require("./routes/messages");
const chatRoute = require("./routes/chat");
const requestRoute = require("./routes/request");
const cors = require("cors");
//const { Server } = require("socket.io");
const http = require("http");

//for scheduling buddy todos
const cron = require('node-cron');
const Buddy = require('./models/buddy');
//goal scheduling
const User = require("./models/user");
const Goal = require("./models/goal");
//for socket io chat
const Chat = require("./models/chat");
const Message = require("./models/message");

const CLIENT_URL = "https://punkt-orbital.netlify.app";
//const CLIENT_URL = "http://localhost:3000";

const app = express();
const server = http.createServer(app);
//const io = new Server(server);
const io = require("socket.io")(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

mongoose.set("useCreateIndex", true);

// middleware
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.urlencoded({ extended: true }));

// app.use(express.static("public"));
app.use(helmet());
app.use(morgan("common"));

app.use(
  session({
    secret: "Orbital 2021 Punkt.",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
    },
    // cookie: { secure: true }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: CLIENT_URL,
    // origin: "https://punkt-milestone2.netlify.app", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.get("/", (req, res) => {
  res.send("Test Punkt Server");
});

/************************CHAT SOCKET IO********************************/

io.on("connection", socket => {
  console.log("SOCKET CONNECTED!!!");
  //first join the correct room [chatId] is the room name
  socket.on("Join Room", chatId => {
    socket.join(chatId);
    console.log("someone joined chat " + chatId);
  });
  //create new message, add message to corresponding chat document
  const sendMessage = async (chatId, body) => {
    try {
      const chat = await Chat.findById(chatId);
      const newMessage = new Message(body);
      const savedMessage = await newMessage.save();
      await chat.updateOne({ $push: { messages: savedMessage }});
      return {
        error: false,
        message: savedMessage
      };
    } catch (err) {
      console.log(err);
      return {
        error: true
      };
    }
  };

  socket.on("Send Message", async (chatId, body) => {
    const message = await sendMessage(chatId, body);
    io.to(chatId).emit("Receive Message", message);
  });
});

// CHECK AND UPDATE FAILED GOAL STATUS AT 00:00 EVERY DAY
cron.schedule("0 0 * * *", async () => {
  //update buddy
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
    //res.status(200).json(allBuddies);
  } catch (err) {
      console.log(err);
      return res.status(500).json('Server Error');
  }
  
  //update goals
  const dateDiffInDays = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  };
  console.log("UPDATE START");
  try {
    const allGoalsInProgress = await Goal.find({ status: "In Progress" });
    const updatedData = await Promise.all(
      allGoalsInProgress.map(async (goal) => {
        if (
          goal.postIds.length <
          dateDiffInDays(new Date(goal.createdAt), new Date())
        ) {
          // FAILED GOAL
          const user = await User.findById(goal.userId);

          // clear curr goal id of user
          await user.updateOne({ $set: { goalId: "" } });

          // update goal status
          await goal.updateOne({ $set: { status: "Failed" } });

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
                    update: { $pull: { betAgainst: goal.id } },
                  },
                },
                {
                  updateOne: {
                    filter: { _id: userBetAgainst },
                    update: {
                      $push: {
                        betHistory: goal.id,
                      },
                    },
                  },
                },
              ]);
            })
          );
        }
      })
    );
    console.log("UPDATED DATA");
    console.log(updatedData);
    // res.status(200).json(updatedData);
  } catch (err) {
    console.log(err);
    // return res.status(500).json(err);
  }
});

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/goal", goalRoute);
app.use("/comment", commentRoute);
app.use("/report", reportRoute);
app.use("/contact", contactRoute);
app.use("/buddy", buddyRoute);
app.use("/message", messageRoute);
app.use("/chat", chatRoute);
app.use("/request", requestRoute);

const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    process.env.MONGO_URI,
    //"mongodb://localhost:27017/testDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() =>
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  )
  .catch((err) => console.log(`${err} did not connect`));

// app.listen(PORT, function () {
//   console.log(`Server started on port ${PORT}`);
// });
