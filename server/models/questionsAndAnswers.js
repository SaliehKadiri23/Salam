const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const questionAndAnswerSchema = new mongoose.Schema({
  askedBy: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  answeredBy: {
    type: ObjectId,
    ref: "User",
  },
  dateAsked: {
    type: Date,
    required: true,
  },
  dateAnswered: {
    type: Date,
  },
  questionCategory: {
    type: String,
    required: true,
    enum: ["general", "fiqh", "finance", "daily-life", "worship"],
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },
  likedBy:  {
    type: [ObjectId],
    ref: "User",
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  question: {
    type: String,
    minLength: 3,
    required: true,
  },
  answer: {
    type: String,
    minLength: 3,
  },
});

// Toggling Likes
questionAndAnswerSchema.statics.toggleLike = async function (
  questionId,
  userId
) {
  const question = await this.findById(questionId);
  if (!question) throw new Error("Question not found");

  const alreadyLiked = question.likedBy.includes(userId);

  if (alreadyLiked) {
    // Unlike
    question.likedBy.pull(userId);
    question.likes = question.likedBy.length;
  } else {
    // Like
    question.likedBy.push(userId);
    question.likes = question.likedBy.length;
  }

  await question.save();

  return {
    likes: question.likes,
    liked: !alreadyLiked, // whether user liked after this action
  };
};





const QuestionAndAnswer = mongoose.model("QuestionAndAnswer", questionAndAnswerSchema);

module.exports = QuestionAndAnswer;