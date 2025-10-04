const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
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
    default: Date.now,
  },
  image: String,
  isBookmarked: {
    type: Boolean,
    default: false,
  },
  likedBy: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    default: [],
  },
  likes: { type: Number, default: 0 },
  readTime: { type: Number, default: 0 },
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Toggling Likes
articleSchema.statics.toggleLike = async function (
  articleId,
  userId
) {
  const article = await this.findById(articleId);
  if (!article) throw new Error("Article not found");

  const alreadyLiked = article.likedBy.includes(userId);

  if (alreadyLiked) {
    // Unlike
    article.likedBy.pull(userId);
    article.likes = article.likedBy.length;
  } else {
    // Like
    article.likedBy.push(userId);
    article.likes = article.likedBy.length;
  }

  await article.save();

  return {
    likes: article.likes,
    liked: !alreadyLiked // whether user liked after this action
  };
};

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
