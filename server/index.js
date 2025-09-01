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
      let newQuestion = req.body
    
    await QuestionAndAnswer.insertOne(newQuestion).then(res => console.log(res))
    res.send("Question Added Successfully")
    } catch (error) {
      throw new Error("Error : ", error);
      
    }
    

  });

  // Updating a QuestionsAndAnswer
  app.patch("/questions_and_answers/:id", async (req, res) => {
    let {id} = req.body
    res.send(`Updated QA with id : ${id}`);
  });

  // Deleting a QuestionsAndAnswer
  app.delete("/questions_and_answers/:id", async (req, res) => {
    try {
       let {id} = req.params
       const result = await QuestionAndAnswer.findByIdAndDelete(id)
       console.log(`Deleted QA with id : ${id}`);
       res.send(result);
    } catch (error) {
      console.log("Deleted Successfully!!!")
    }
   
    
  });
}

app.listen(7000, () => {
  console.log("RUNNING ON PORT: 7000");
});
