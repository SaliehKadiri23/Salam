const mongoose = require("mongoose");
const QuestionAndAnswer = require("./models/questionsAndAnswers");
const User = require("./models/user");

const dbUrl = "mongodb://127.0.0.1:27017/salam";

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connection Successful"))
  .catch((e) => console.log("error: ", e));

mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection Error : ")
);

mongoose.connection.once("open", async () => {
  console.log("Database connected!");
  
  try {
    // Clear existing questions
    await QuestionAndAnswer.deleteMany({});
    console.log("Cleared existing questions");
    
    // Create sample questions
    const sampleQuestions = [
      {
        askedBy: new mongoose.Types.ObjectId(), // Random user ID for testing
        dateAsked: new Date(Date.now() - 86400000), // 1 day ago
        questionCategory: "fiqh",
        question: "What is the proper way to perform wudu (ablution) according to the Sunnah?",
        isAnswered: false
      },
      {
        askedBy: new mongoose.Types.ObjectId(), // Random user ID for testing
        dateAsked: new Date(Date.now() - 172800000), // 2 days ago
        questionCategory: "worship",
        question: "How many rak'ahs are there in each of the five daily prayers?",
        isAnswered: true,
        answeredBy: new mongoose.Types.ObjectId(), // Random scholar ID for testing
        dateAnswered: new Date(Date.now() - 86400000), // 1 day ago
        answer: "There are specific numbers of rak'ahs for each prayer: Fajr has 2 rak'ahs, Dhuhr has 4 rak'ahs, Asr has 4 rak'ahs, Maghrib has 3 rak'ahs, and Isha has 4 rak'ahs. These are the obligatory rak'ahs. There are also additional voluntary rak'ahs that can be performed before or after the obligatory ones."
      },
      {
        askedBy: new mongoose.Types.ObjectId(), // Random user ID for testing
        dateAsked: new Date(Date.now() - 259200000), // 3 days ago
        questionCategory: "daily-life",
        question: "Is it permissible to work in a bank that deals with interest-based transactions?",
        isAnswered: false
      },
      {
        askedBy: new mongoose.Types.ObjectId(), // Random user ID for testing
        dateAsked: new Date(Date.now() - 345600000), // 4 days ago
        questionCategory: "finance",
        question: "What is the Islamic ruling on cryptocurrency investments?",
        isAnswered: true,
        answeredBy: new mongoose.Types.ObjectId(), // Random scholar ID for testing
        dateAnswered: new Date(Date.now() - 172800000), // 2 days ago
        answer: "The ruling on cryptocurrency investments varies among scholars. Some consider them permissible if they are used for legitimate trade and not for speculation. Others are cautious due to their volatile nature and potential for misuse. It is recommended to consult with a knowledgeable scholar who can provide guidance based on your specific circumstances and the particular cryptocurrency in question."
      }
    ];
    
    // Insert sample questions
    for (const question of sampleQuestions) {
      const newQuestion = new QuestionAndAnswer(question);
      await newQuestion.save();
      console.log("Added question:", question.question);
    }
    
    console.log("Sample data created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating sample data:", error);
    process.exit(1);
  }
});