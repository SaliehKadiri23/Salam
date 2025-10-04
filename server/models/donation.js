const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    trim: true
  },
  donorEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Not required to maintain backward compatibility
  },
  donationType: {
    type: String,
    required: true,
    enum: ['Zakat', 'Sadaqah', 'Fitrana', 'General Donation', 'Project Support', 'Orphan Sponsorship', 'Other']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  frequency: {
    type: String,
    default: 'One-time',
    enum: ['One-time', 'Monthly', 'Quarterly', 'Yearly']
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Crypto', 'Other']
  },
  status: {
    type: String,
    default: 'Completed',
    enum: ['Pending', 'Completed', 'Failed', 'Refunded']
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);