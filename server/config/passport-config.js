const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Local Strategy for login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Use email instead of username
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find user by email (within profileInfo.email)
        const user = await User.findOne({ "profileInfo.email": email });
        
        if (!user) {
          return done(null, false, { message: "No account with this email address exists." });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        // Update last login
        user.profileInfo.lastLogin = new Date();
        await user.save();

        return done(null, user);
      } catch (error) {
        console.error("Passport Local Strategy Error:", error);
        return done(error);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;