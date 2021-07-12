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
const cors = require("cors");
const cron = require("node-cron");
const User = require("./models/user");
const Goal = require("./models/goal");

const app = express();

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
    origin: "http://localhost:3000",
    // origin: "https://punkt-milestone2.netlify.app", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.get("/", (req, res) => {
  res.send("Test Punkt Server");
});

// CHECK AND UPDATE FAILED GOAL STATUS AT 00:00 EVERY DAY
cron.schedule("04 16 * * *", async () => {
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

          // push goalId into goal history arr of user
          await user.updateOne({ $push: { goalHistory: goal.id } });

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

const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    // "mongodb+srv://punkt:1236Punkt@punkt.x8rbr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "mongodb://localhost:27017/testDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  )
  .catch((err) => console.log(`${err} did not connect`));

// app.listen(PORT, function () {
//   console.log(`Server started on port ${PORT}`);
// });
