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
    required: true,
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

const QuestionAndAnswer = mongoose.model("QuestionAndAnswer", questionAndAnswerSchema);

module.exports = QuestionAndAnswer;