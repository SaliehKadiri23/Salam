const mongoose = require("mongoose");

const islamicQuoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  reference: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Quran", "Hadith", "Companions", "Scholars", "General"],
    default: "General",
  },
  isQuoteOfTheDay: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Not required to maintain backward compatibility
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // Not required to maintain backward compatibility
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for better query performance
islamicQuoteSchema.index({ isQuoteOfTheDay: 1 });
islamicQuoteSchema.index({ category: 1 });
islamicQuoteSchema.index({ isActive: 1 });

// Middleware to update the updatedAt field
islamicQuoteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure only one quote can be the Quote of the Day
islamicQuoteSchema.statics.setQuoteOfTheDay = async function (quoteId) {
  // First, unset the current Quote of the Day
  await this.updateMany({ isQuoteOfTheDay: true }, { isQuoteOfTheDay: false });
  
  // Then set the new Quote of the Day
  return await this.findByIdAndUpdate(quoteId, { isQuoteOfTheDay: true }, { new: true });
};

const IslamicQuote = mongoose.model("IslamicQuote", islamicQuoteSchema);

module.exports = IslamicQuote;