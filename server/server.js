require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Contact = require("./models/Contact");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
}));
app.use(express.json({ limit: "10kb" }));

app.use("/api/contact", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many messages. Please try again later." }
}));

app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", message: "Portfolio API is running" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (![name, email, subject, message].every((value) => typeof value === "string")) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const clean = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    };

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !clean.name || clean.name.length > 80 ||
      !validEmail.test(clean.email) || clean.email.length > 254 ||
      !clean.subject || clean.subject.length > 150 ||
      clean.message.length < 5 || clean.message.length > 3000
    ) {
      return res.status(400).json({ message: "Please check the form fields and try again." });
    }

    const contact = await Contact.create(clean);
    return res.status(201).json({ message: "Message saved successfully.", id: contact._id });
  } catch (error) {
    console.error("Contact endpoint error:", error.message);
    return res.status(500).json({ message: "Unable to save your message right now." });
  }
});


async function start() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing. Copy .env.example to .env and configure it.");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected.");
    app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

start();
