const mongoose = require("mongoose");

const volunteerApplicationSchema = new mongoose.Schema({
  volunteerOpportunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VolunteerOpportunity",
    required: true
  },
  fullName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  phone: {
    type: String,
    required: true,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  },
  availability: {
    type: String,
    required: true,
    enum: ["weekdays", "weekends", "evenings", "flexible"]
  },
  experience: {
    type: String,
    maxlength: 1000,
    default: ""
  },
  motivation: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
volunteerApplicationSchema.index({ volunteerOpportunity: 1 });
volunteerApplicationSchema.index({ email: 1 });
volunteerApplicationSchema.index({ status: 1 });

const VolunteerApplication = mongoose.model("VolunteerApplication", volunteerApplicationSchema);

module.exports = VolunteerApplication;