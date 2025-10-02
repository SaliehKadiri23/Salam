
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

// Signup Route
router.post("/signup", async (req, res) => {
  // console.log("Signup request received:", req.body);
  try {
    const { fullName, email, password, role, location, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ "profileInfo.email": email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      password: hashedPassword,
      profileInfo: {
        fullName,
        email,
        role,
        location,
        phone,
        joinDate: new Date(),
        lastLogin: new Date(),
      },
    });


    await newUser.save();

    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

module.exports = router;
