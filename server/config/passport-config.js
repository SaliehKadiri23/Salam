const passport = require("passport");
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
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

const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ['profile', 'email'],
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in our database
      let user = await User.findOne({ 'profileInfo.email': profile.emails[0].value });

      if (user) {
        // If user exists, update last login and return user
        user.profileInfo.lastLogin = new Date();
        await user.save();
        return done(null, user);
      } else {
        // If user doesn't exist, just pass the profile info to the callback
        const socialProfile = {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        };
        return done(null, socialProfile);
      }
    } catch (error) {
      console.error("Google OAuth Strategy Error:", error);
      return done(error, false);
    }
  }
));

module.exports = passport;