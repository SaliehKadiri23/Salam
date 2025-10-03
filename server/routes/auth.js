
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

// Login Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Login Error:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Server error during authentication" 
      });
    }
    
    if (!user) {
      // Authentication failed
      return res.status(401).json({ 
        success: false, 
        message: info.message || "Authentication failed" 
      });
    }
    
    // Authentication successful, create session
    req.logIn(user, (err) => {
      if (err) {
        console.error("Session creation error:", err);
        return res.status(500).json({ 
          success: false, 
          message: "Error creating session" 
        });
      }
      
      // Return user info (excluding sensitive data)
      const userData = {
        id: user._id,
        email: user.profileInfo.email,
        name: user.profileInfo.fullName,
        role: user.profileInfo.role,
        profilePicture: null, // Add profile picture field if implemented later
        joinDate: user.profileInfo.joinDate,
        lastLogin: user.profileInfo.lastLogin,
        isEmailVerified: user.profileInfo.isEmailVerified,
      };
      
      return res.status(200).json({ 
        success: true, 
        user: userData,
        message: "Login successful"
      });
    });
  })(req, res, next);
});

// Logout Route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ 
        success: false, 
        message: "Error logging out" 
      });
    }
    
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ 
          success: false, 
          message: "Error destroying session" 
        });
      }
      
      res.clearCookie('connect.sid'); // Clear session cookie
      res.status(200).json({ 
        success: true, 
        message: "Logout successful" 
      });
    });
  });
});

// Check Auth Status Route (for checking if user is logged in on page load)
router.get("/check-auth", (req, res) => {
  if (req.isAuthenticated() && req.user) {
    const user = req.user;
    const userData = {
      id: user._id,
      email: user.profileInfo.email,
      name: user.profileInfo.fullName,
      role: user.profileInfo.role,
      profilePicture: null, // Add profile picture field if implemented later
      joinDate: user.profileInfo.joinDate,
      lastLogin: user.profileInfo.lastLogin,
      isEmailVerified: user.profileInfo.isEmailVerified,
    };
    
    return res.status(200).json({ 
      success: true, 
      user: userData,
      isAuthenticated: true 
    });
  } else {
    return res.status(200).json({ 
      success: false, 
      user: null,
      isAuthenticated: false 
    });
  }
});

// Google OAuth Routes
router.get('/google', (req, res, next) => {
  console.log('Google auth route hit');
  const { role } = req.query;
  const state = role ? Buffer.from(JSON.stringify({ role })).toString('base64') : '';
  passport.authenticate('google', { scope: ['profile', 'email'], state })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  const { state } = req.query;
  const { role } = state ? JSON.parse(Buffer.from(state, 'base64').toString()) : { role: null };

  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:5173/login');
    }

    // If the user is found in the database, log them in and redirect to home
    if (user._id) {
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('http://localhost:5173');
      });
    } else {
      // If it's a new user (social profile), store it in the session and redirect to signup
      req.session.socialProfile = { ...user, role };
      res.redirect('http://localhost:5173/signup?step=completeProfile');
    }
  })(req, res, next);
});

// New route to get social profile from session
router.get('/social-profile', (req, res) => {
  if (req.session.socialProfile) {
    res.status(200).json(req.session.socialProfile);
    // Clear the social profile from the session after it's been sent
    delete req.session.socialProfile;
  } else {
    res.status(404).json({ message: 'No social profile found in session.' });
  }
});

module.exports = router;
