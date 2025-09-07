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
  likes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [ObjectId],
    ref: "User",
    default: []
  },
  prayerCount: {
    type: Number,
    default: 0
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

// Toggling Likes
duaRequestSchema.statics.toggleLike = async function(duaId, userId) {
  const dua = await this.findById(duaId);
  if (!dua) throw new Error("Dua request not found");

  const alreadyLiked = dua.likedBy.includes(userId);

  if (alreadyLiked) {
    // Unlike
    dua.likedBy.pull(userId);
    dua.likes = dua.likedBy.length;
  } else {
    // Like
    dua.likedBy.push(userId);
    dua.likes = dua.likedBy.length;
  }

  await dua.save();

  return {
    likes: dua.likes,
    liked: !alreadyLiked // whether user liked after this action
  };
};

// Increment prayer count
duaRequestSchema.statics.incrementPrayerCount = async function(duaId) {
  const dua = await this.findById(duaId);
  if (!dua) throw new Error("Dua request not found");

  dua.prayerCount += 1;
  await dua.save();

  return {
    prayerCount: dua.prayerCount
  };
};

const DuaRequest = mongoose.model("DuaRequest", duaRequestSchema);

module.exports = DuaRequest;