const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Article = require("./models/article")

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

app.get("/resources", async (req, res)=>{
    // Getting All Articles
    let allArticles = await Article.find({})

    res.json(allArticles)
})

app.listen(7000, () => {
  console.log("RUNNING ON PORT: 7000");
});
