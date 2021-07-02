require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const goalRoute = require("./routes/goal");
const commentRoute = require("./routes/comment");
const reportRoute = require("./routes/report");
const cors = require("cors");

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    // console.log(req.files);
    // cb(null, file.originalname);
    // const { originalname } = file;
    // const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
    // cb(null, `${Date.now()}${originalname}`);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("file", 6), (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    return res.status(200).json("Files uploaded successfully");
  } catch (err) {
    console.log(err);
  }
}); // max count 6

app.get("/", (req, res) => {
  res.send("Test Punkt Server");
});

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/goal", goalRoute);
app.use("/comment", commentRoute);
app.use("/report", reportRoute);

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
