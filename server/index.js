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
    let questionAndAnswer = await QuestionAndAnswer.find({});

    res.json(questionAndAnswer);
  });

  // Adding a QuestionsAndAnswer
  app.post("/questions_and_answers", async (req, res) => {
    res.send("New QA received");
  });

  // Updating a QuestionsAndAnswer
  app.patch("/questions_and_answers/:id", async (req, res) => {
    let {id} = req.params
    res.send(`Updated QA with id : ${id}`);
  });

  // Deleting a QuestionsAndAnswer
  app.delete("/questions_and_answers/:id", async (req, res) => {
    let {id} = req.params
    res.send(`Deleted QA with id : ${id}`);
  });
}

app.listen(7000, () => {
  console.log("RUNNING ON PORT: 7000");
});
