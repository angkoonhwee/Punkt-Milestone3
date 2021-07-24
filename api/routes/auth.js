const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
const User = require("../models/user");
const flash = require("express-flash");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const CLIENT_URL = "http://localhost:3000";

schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(50) // Maximum length 50
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1); // Must have at least 1 digits

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/auth/google/punkt",
//       // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       // console.log(profile);
//       // console.log(accessToken);

//       User.findOrCreate(
//         {
//           googleId: profile.id,
//           email: profile.emails[0].value,
//           // username: profile.name.familyName + profile.name.givenName,
//           username: profile.emails[0].value,
//           profilePicture: profile.photos[0].value,
//         },
//         function (err, user) {
//           // console.log(user);
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/punkt",
  passport.authenticate("google", {
    failureRedirect: "/google-login/failed",
  }),
  (req, res) => {
    // console.log(reqs.user);
    // Successful authentication, redirect home.
    // console.log("successful authentication with google");
    res.status(200).json(req.user);
    // res.redirect(CLIENT_URL);
  }
);

router.get("/google-login/failed", (req, res) => {
  res.status(401).json({ message: "Google authentication failed." });
});

router.get("/google-login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get("/logout", (req, res) => {
  console.log("logout");
  req.logout();
  res.redirect(CLIENT_URL);
});

// SIGN UP
router.post("/signup", async (req, res) => {
  if (!schema.validate(req.body.password)) {
    // password do not match requirements
    return res.status(403).json({
      message:
        "Password must be at least 6 characters with at least 1 UPPER case, 1 lower case and 1 numeric digit.",
    });
  }

  if (req.body.password !== req.body.password2) {
    return res.status(403).json({
      message: "Passwords do not match",
    });
  }

  const duplicateUsername = await User.findOne({
    username: req.body.username,
  });
  const duplicateEmail = await User.findOne({ email: req.body.email });

  try {
    if (duplicateUsername) {
      return res.status(403).json({ message: "Username has been registered." });
    }

    if (duplicateEmail) {
      return res.status(403).json({ message: "Email has been registered." });
    }

    User.register(
      {
        email: req.body.email,
        username: req.body.username,
      },
      req.body.password,
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({ message: "Server Error." });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.status(200).json(result);
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(403)
          .json({ message: "Invalid email or password. Try Again!" });
      }

      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })(req, res, next);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", function (req, res, next) {
  // console.log("req.headers.host: " + req.headers.host);

  async.waterfall(
    [
      (done) => {
        crypto.randomBytes(20, (err, buf) => {
          if (err) {
            console.log(err);
          } else {
            const token = buf.toString("hex");
            done(err, token);
          }
        });
      },
      (token, done) => {
        User.findOne(
          {
            email: req.body.email,
          },
          (err, user) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: "Server error." });
            }
            if (!user) {
              return res.status(401).json({
                message: "No account with that email address exists.",
              });
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 1200000; // 20min

            user.save((err) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ message: "Server error." });
              }
              done(err, token, user);
            });
          }
        );
      },
      (token, user, done) => {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "punkt.orbital@gmail.com",
            pass: process.env.GMAILPW,
          },
        });
        const mailOptions = {
          from: "punkt.orbital@gmail.com",
          to: user.email,
          subject: "Punkt Password Reset",
          text:
            "Dear " +
            user.username +
            ", \n\n" +
            "You are receiving this because you have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            CLIENT_URL +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request for password reset, please ignore this email and your password will remain unchanged.\n\n" +
            "Punkt Developer Team",
        };
        transporter.sendMail(mailOptions, function (err) {
          res.status(200).json({
            message: "Please check your email for further instructions.",
          });
          done(err, "done");
        });
      },
    ],
    (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.redirect(`${CLIENT_URL}/forgot-password`);
    }
  );
});

router.get("/reset/:token", function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
    function (err, user) {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Password reset token is invalid or has expired" });
      }
    }
  );
});

router.post("/reset/:token", (req, res) => {
  async.waterfall(
    [
      (done) => {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
              $gt: Date.now(),
            },
          },
          (err, user) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: "Server error." });
            }

            if (!user) {
              return res.status(401).json({
                message: "Password reset token is invalid or has expired",
              });
            } else {
              if (req.body.password !== req.body.password2) {
                return res.status(401).json({
                  message: "Passwords do not match.",
                });
              } else if (!schema.validate(req.body.password)) {
                return res.status(401).json({
                  message:
                    "Password must be at least 6 characters with at least 1 UPPER case, 1 lower case and 1 numeric digit.",
                });
              } else {
                user.setPassword(req.body.password, (err) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Server error." });
                  } else {
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function (err) {
                      req.login(user, function (err) {
                        done(err, user);
                      });
                    });
                  }
                });
              }
            }
          }
        );
      },
      (user, done) => {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "punkt.orbital@gmail.com",
            pass: process.env.GMAILPW,
          },
        });

        const mailOptions = {
          to: user.email,
          from: "punkt.orbital@gmail.com",
          subject: "Your password has been changed",
          text:
            "Dear " +
            user.username +
            ",\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n\n" +
            "Punkt Developer Team",
        };
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error." });
          } else {
            res.status(200).json({
              message: "Yay! Your password has been changed successfully.",
            });
            done(err);
          }
        });
      },
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error." });
      } else {
        res.redirect(CLIENT_URL + "/login");
      }
    }
  );
});

module.exports = router;