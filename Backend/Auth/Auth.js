const express = require("express");
const User = require("../Model/User");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

// Registration
exports.Register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate inputs
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        Status: "Failed",
        Message: "Please provide username, email, password, and role",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        Status: "Failed",
        Message: "This account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Initialize cartdata
    const cartdata = Array.from({ length: 300 }, () => 0);

    // Create new user
    const newUser = new User({
      username,
      email,
      role,
      password: hashedPassword,
      cartdata,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || "qwerty12345",
      {
        expiresIn: "90d",
      }
    );

    res.status(200).json({
      Status: "Success",
      Message: "Account has been created",
      UserName: username,
      Token: token,
      cartdata,
      role,
    });
  } catch (error) {
    console.error("Error while creating account:", error);
    res.status(500).json({
      Status: "Failed",
      Message: "Internal server error while creating account",
    });
  }
};

// Login
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        Status: "Failed",
        Message: "Please provide email and password",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        Status: "Failed",
        Message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        Status: "Failed",
        Message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "qwerty12345",
      {
        expiresIn: "90d",
      }
    );

    res.status(200).json({
      Status: "Success",
      Message: "Logged in successfully",
      UserName: user.username,
      Token: token,
      cartdata: user.cartdata,
      role: user.role,
      p: user.products,
    });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({
      Status: "Failed",
      Message: "Internal server error while logging in",
    });
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.endsWith(".com");
};

exports.updateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        Status: "Failed",
        Message:
          "Invalid email format. Please use a valid email ending with .com",
      });
    }

    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({
        Status: "Failed",
        Message: "User Not Found",
      });
    }

    user.email = email;

    await user.save();

    res.status(200).json({
      Status: "Success",
      Message: "Email Updated Successfully",
      Data: {
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      Status: "Failed",
      Message: "An error occurred",
      Error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.protect = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).send({
      Status: "Failed",
      Message: "Please Login To Continue",
    });
  } else {
    try {
      const data = jwt.verify(token, "qwerty12345");
      req.user = data;
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

exports.roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access Denied");
    }
    next();
  };
};
