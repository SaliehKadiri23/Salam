const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  source: {
    type: String,
    enum: ['website', 'event', 'referral', 'other'],
    default: 'website'
  },
  preferences: {
    weeklyDigest: {
      type: Boolean,
      default: true
    },
    eventNotifications: {
      type: Boolean,
      default: true
    },
    articles: {
      type: Boolean,
      default: true
    },
    communityUpdates: {
      type: Boolean,
      default: true
    }
  }
});

// Indexes for better query performance
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ subscribedAt: -1 });
newsletterSchema.index({ isActive: 1 });

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

module.exports = Newsletter;