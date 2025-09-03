const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Article = require("./models/article")
const Forum = require("./models/forum")
const QuestionAndAnswer = require("./models/questionsAndAnswers");


const dbUrl = "mongodb://127.0.0.1:27017/salam";

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connection Successful"))
  .catch((e) => console.log("error: ", e));

mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection Error : ")
);
mongoose.connection.once("open", () => {
  console.log("Database connected!");
});


const app = express();

app.use(cors());
app.use(express.json());

// ! Articles
{
// Getting All Articles
app.get("/articles", async (req, res)=>{
    
    let allArticles = await Article.find({})

    res.json(allArticles)
})
}

// ! Forums
{//  Getting All Forums
app.get("/forums", async (req, res)=>{
  
    let forums = await Forum.find({})

    res.json(forums)
})}

// ! Questions And Answers
{
  //  Getting All Questions And Answers
  app.get("/questions_and_answers", async (req, res) => {
    let questionsAndAnswers = await QuestionAndAnswer.find({});

    res.json(questionsAndAnswers);
  });

  // Adding a QuestionsAndAnswer
  app.post("/questions_and_answers", async (req, res) => {
    try {
      let newQuestion = req.body;

      await QuestionAndAnswer.insertOne(newQuestion).then((res) =>
        console.log(res)
      );
      res.send("Question Added Successfully");
    } catch (error) {
      throw new Error("Error : ", error);
    }
  });

  // Updating a QuestionsAndAnswer
  app.patch("/questions_and_answers/:id", async (req, res) => {
    let { id } = req.body;
    res.send(`Updated QA with id : ${id}`);
  });

  // Deleting a QuestionsAndAnswer
  app.delete("/questions_and_answers/:id", async (req, res) => {
    try {
      let { id } = req.params;
      const result = await QuestionAndAnswer.findByIdAndDelete(id);
      console.log(`Deleted QA with id : ${id}`);
      res.send(result);
    } catch (error) {
      console.log("Error : ", error);
    }
  });

  // Liking/Un-liking a QuestionsAndAnswer
  app.post("/questions_and_answers/:id/like", async (req, res) => {
    try {
      let { id } = req.params;
      const result = await QuestionAndAnswer.toggleLike(
        id,
        "64f1abf1a2b4c3d4e5f6a111"
        // TODO : IN SHA ALLAH - Replace with req.user._id when auth done
      );
      res.json(result);
    } catch (error) {
      console.log("Error!!!", error);
    }
  });

  // ! Newsletter SignUp
  // Adding a Newsletter
  app.post("/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      console.log("Newsletter signup request:", email);

      // Import the Newsletter model
      const Newsletter = require("./models/newsletter");

      // Check if email already exists
      const existingSubscriber = await Newsletter.findOne({ email });
      if (existingSubscriber) {
        return res.status(400).json({ 
          success: false, 
          message: "This email is already subscribed to our newsletter." 
        });
      }

      // Create new newsletter subscriber
      const newSubscriber = new Newsletter({ email });
      await newSubscriber.save();

      res.status(201).json({ 
        success: true, 
        message: "Thank you for subscribing to our newsletter!",
        data: newSubscriber
      });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          success: false, 
          message: "Please provide a valid email address." 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while subscribing. Please try again later." 
      });
    }
  });
}

app.listen(7000, () => {
  console.log("RUNNING ON PORT: 7000");
});
