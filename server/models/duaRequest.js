const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const duaRequestSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ["health", "guidance", "success", "family", "community"]
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    required: function() {
      return !this.isAnonymous;
    }
  },
  userId: {
    type: ObjectId,
    ref: "User"
  },
  prayerCount: {
    type: Number,
    default: 0
  },
  prayedBy: {
    type: [ObjectId],
    ref: "User",
    default: []
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
duaRequestSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

// Increment prayer count and track who prayed
duaRequestSchema.statics.incrementPrayerCount = async function(duaId, userId) {
  const dua = await this.findById(duaId);
  if (!dua) throw new Error("Dua request not found");

  // Check if user already prayed
  const alreadyPrayed = dua.prayedBy.includes(userId);
  
  if (!alreadyPrayed) {
    // Only increment if user hasn't prayed before
    dua.prayerCount += 1;
    dua.prayedBy.push(userId);
    await dua.save();
  }

  return {
    prayerCount: dua.prayerCount,
    prayed: !alreadyPrayed // whether user prayed after this action
  };
};

const DuaRequest = mongoose.model("DuaRequest", duaRequestSchema);

module.exports = DuaRequest;