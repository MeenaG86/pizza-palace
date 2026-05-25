const express = require("express");

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

const jwt = require("jsonwebtoken");

// Register API
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

});
//Login API
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

});
router.post("/admin-login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Hardcoded admin
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {

      const token = jwt.sign(
        {
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        success: true,
        token,
      });

    }

    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});
module.exports = router;