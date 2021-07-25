const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');

router.get("/", (req, res) => {
  res.send("test contact");
});

router.post("/enquiry", (req, res) => {
  const { name, email, content } = req.body;

  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY
    })
  );

  transport.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Punkt Orbital Enquiry",
    text: `Name: ${name} \nEmail: ${email} \n\nEnquiry: ${content}`
  }).then((response) => {
    console.log("email sent");
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