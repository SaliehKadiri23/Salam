const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 10,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Islam", "Culture", "Lifestyle", "Community"],
    required: true,
    trim: true,
  },
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  publishDate: {
    type: Date,
    required: true,
  },
  image: String,
  isBookmarked: {
    type: Boolean,
    default: false,
  },
  likes: { type: Number, default: 0 },
  readTime: { type: Number, default: 0 },
});

// Model / MongoDB Collection (Articles)
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
