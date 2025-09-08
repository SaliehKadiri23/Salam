const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const volunteerOpportunitySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Mosque Events", "Educational Programs", "Community Outreach", "Other"]
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  organization: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000
  },
  location: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  timeCommitment: {
    type: String,
    required: true,
    enum: ["4-8 hours/week", "5-8 hours/week", "6-10 hours/week", "8-12 hours/week", "10-15 hours/week", "12-20 hours/week", "Flexible"]
  },
  skillLevel: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"]
  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: function(skills) {
        return skills.length > 0;
      },
      message: 'At least one skill is required'
    }
  },
  urgency: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"]
  },
  spotsAvailable: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  image: {
    type: String,
    default: ""
  },
  remote: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the updatedAt field
volunteerOpportunitySchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

const VolunteerOpportunity = mongoose.model("VolunteerOpportunity", volunteerOpportunitySchema);

module.exports = VolunteerOpportunity;