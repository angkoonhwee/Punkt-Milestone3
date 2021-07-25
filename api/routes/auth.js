const express = require("express");
const router = express.Router();
const passport = require("passport");
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
const User = require("../models/user");
const async = require("async");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');

const CLIENT_URL = "https://punkt-orbital.netlify.app";
//const CLIENT_URL = "http://localhost:3000";

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
        const transport = nodemailer.createTransport(
          nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY
          })
        );

        const mailOptions = {
          from: "punkt.orbital@gmail.com",
          to: user.email,
          subject: "Punkt - Password Reset",
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

        transport.sendMail(mailOptions)
          .then((response) => {
            console.log("email sent");
            return res
              .status(200)
              .json({ message: "Please check your email (incl. spam mail) for further instructions." });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
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
        const transport = nodemailer.createTransport(
          nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY
          })
        );

        const mailOptions = {
          to: user.email,
          from: "punkt.orbital@gmail.com",
          subject: "Punkt - Your password has been reset",
          text:
            "Dear " +
            user.username +
            ",\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n\n" +
            "Punkt Developer Team",
        };
        transport.sendMail(mailOptions)
        .then((response) => {
          console.log("email sent");
          return res
            .status(200)
            .json({ message: "Yay! Your password has been changed successfully." });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
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