const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const forumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 500,
    trim: true,
  },
  createdBy: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  admins: {
    type: [ObjectId],
    required: true,
    ref: "User",
  },
  members: {
    type: [ObjectId],
    ref: "User",
    default: []
    // For number of members, use members.length
  },
  posts: {
    type: [ObjectId],
    ref: "ForumPost",
    default: []
  },
  createdDate: {
    type: Date,
    required: true,
  }
});

let Forum = mongoose.model("Forum", forumSchema)

module.exports = Forum; 