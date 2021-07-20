const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  res.send("test contact");
});

router.post("/enquiry", (req, res) => {
  const { name, email, content } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAILPW,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Punkt Orbital Enquiry",
    text: `Name: ${name} \nEmail: ${email} \n\nEnquiry: ${content}`,
  };

  transporter
    .sendMail(mailOptions)
    .then((response) => {
      return res
        .status(200)
        .json({ message: "Enquiry has been successfully sent!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

module.exports = router;