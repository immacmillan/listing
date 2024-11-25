// server/server.js

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "your-email@gmail.com",

    pass: "your-email-password",
  },
});

app.post("/send-email", (req, res) => {
  const { subject, text } = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",

    to: "your-email@gmail.com",

    subject: subject,

    text: text,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    res.status(200).send("Email sent: " + info.response);
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("MongoDB connected"))

  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
