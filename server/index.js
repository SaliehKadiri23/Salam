const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Article = require("./models/article")
const Forum = require("./models/forum")
const QuestionAndAnswer = require("./models/questionsAndAnswers");
const IslamicQuote = require("./models/islamicQuote");

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
  
  // Getting all Newsletter Subscribers
  app.get("/newsletter", async (req, res) => {
    try {
      // Import the Newsletter model
      const Newsletter = require("./models/newsletter");
      
      // Fetch all newsletter subscribers, sorted by subscription date (newest first)
      const subscribers = await Newsletter.find({ isActive: true })
        .sort({ subscribedAt: -1 });
      
      res.json({
        success: true,
        count: subscribers.length,
        data: subscribers
      });
    } catch (error) {
      console.error("Error fetching newsletter subscribers:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching subscribers. Please try again later." 
      });
    }
  });
  
  // ! Islamic Quotes
  // Get all Islamic quotes
  app.get("/islamic-quotes", async (req, res) => {
    try {
      const IslamicQuote = require("./models/islamicQuote");
      
      const quotes = await IslamicQuote.find({ isActive: true })
        .sort({ createdAt: -1 });
      
      res.json({
        success: true,
        count: quotes.length,
        data: quotes
      });
    } catch (error) {
      console.error("Error fetching Islamic quotes:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching quotes. Please try again later." 
      });
    }
  });
  
  // Get the Quote of the Day
  app.get("/islamic-quotes/quote-of-the-day", async (req, res) => {
    try {
      const IslamicQuote = require("./models/islamicQuote");
      
      // Find the quote marked as Quote of the Day
      const quoteOfTheDay = await IslamicQuote.findOne({ 
        isQuoteOfTheDay: true,
        isActive: true
      });
      
      // If no quote is marked as Quote of the Day, get the most recent quote
      if (!quoteOfTheDay) {
        const latestQuote = await IslamicQuote.findOne({ isActive: true })
          .sort({ createdAt: -1 });
        
        return res.json({
          success: true,
          data: latestQuote || null
        });
      }
      
      res.json({
        success: true,
        data: quoteOfTheDay
      });
    } catch (error) {
      console.error("Error fetching Quote of the Day:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching the Quote of the Day. Please try again later." 
      });
    }
  });
  
  // Get latest 7 quotes for rotation in Prayer Times page
  app.get("/islamic-quotes/latest", async (req, res) => {
    try {
      const IslamicQuote = require("./models/islamicQuote");
      
      const quotes = await IslamicQuote.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(7);
      
      res.json({
        success: true,
        count: quotes.length,
        data: quotes
      });
    } catch (error) {
      console.error("Error fetching latest Islamic quotes:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching quotes. Please try again later." 
      });
    }
  });
  
  // Add a new Islamic quote
  app.post("/islamic-quotes", async (req, res) => {
    try {
      const { text, reference, category, isQuoteOfTheDay } = req.body;
      const IslamicQuote = require("./models/islamicQuote");
      
      // If this quote is marked as Quote of the Day, unset the current one
      if (isQuoteOfTheDay) {
        await IslamicQuote.updateMany({ isQuoteOfTheDay: true }, { isQuoteOfTheDay: false });
      }
      
      const newQuote = new IslamicQuote({
        text,
        reference,
        category,
        isQuoteOfTheDay: isQuoteOfTheDay || false
      });
      
      await newQuote.save();
      
      res.status(201).json({
        success: true,
        message: "Quote added successfully!",
        data: newQuote
      });
    } catch (error) {
      console.error("Error adding Islamic quote:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while adding the quote. Please try again later." 
      });
    }
  });
  
  // Update an Islamic quote
  app.patch("/islamic-quotes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { text, reference, category, isQuoteOfTheDay, isActive } = req.body;
      const IslamicQuote = require("./models/islamicQuote");
      
      // If this quote is marked as Quote of the Day, unset the current one
      if (isQuoteOfTheDay) {
        await IslamicQuote.updateMany({ isQuoteOfTheDay: true }, { isQuoteOfTheDay: false });
      }
      
      const updatedQuote = await IslamicQuote.findByIdAndUpdate(
        id,
        {
          text,
          reference,
          category,
          isQuoteOfTheDay: isQuoteOfTheDay || false,
          isActive
        },
        { new: true, runValidators: true }
      );
      
      if (!updatedQuote) {
        return res.status(404).json({
          success: false,
          message: "Quote not found."
        });
      }
      
      res.json({
        success: true,
        message: "Quote updated successfully!",
        data: updatedQuote
      });
    } catch (error) {
      console.error("Error updating Islamic quote:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while updating the quote. Please try again later." 
      });
    }
  });
  
  // Delete an Islamic quote (permanent delete)
  app.delete("/islamic-quotes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const IslamicQuote = require("./models/islamicQuote");
      
      const deletedQuote = await IslamicQuote.findByIdAndDelete(id);
      
      if (!deletedQuote) {
        return res.status(404).json({
          success: false,
          message: "Quote not found."
        });
      }
      
      res.json({
        success: true,
        message: "Quote deleted successfully!",
        data: deletedQuote
      });
    } catch (error) {
      console.error("Error deleting Islamic quote:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while deleting the quote. Please try again later." 
      });
    }
  });

  // ! Resources
  // Get all resources
  app.get("/resources", async (req, res) => {
    try {
      const Resource = require("./models/resource");
      const resources = await Resource.find({}).sort({ publishedDate: -1 });
      res.json({
        success: true,
        count: resources.length,
        data: resources
      });
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching resources. Please try again later." 
      });
    }
  });

  // Get a single resource by ID
  app.get("/resources/:id", async (req, res) => {
    try {
      const Resource = require("./models/resource");
      const { id } = req.params;
      const resource = await Resource.findById(id);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found."
        });
      }
      
      res.json({
        success: true,
        data: resource
      });
    } catch (error) {
      console.error("Error fetching resource:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching the resource. Please try again later." 
      });
    }
  });

  // Create a new resource
  app.post("/resources", async (req, res) => {
    try {
      const Resource = require("./models/resource");
      const newResource = new Resource(req.body);
      await newResource.save();
      
      res.status(201).json({
        success: true,
        message: "Resource created successfully!",
        data: newResource
      });
    } catch (error) {
      console.error("Error creating resource:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the resource. Please try again later." 
      });
    }
  });

  // Update a resource
  app.patch("/resources/:id", async (req, res) => {
    try {
      const Resource = require("./models/resource");
      const { id } = req.params;
      const updatedResource = await Resource.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!updatedResource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found."
        });
      }
      
      res.json({
        success: true,
        message: "Resource updated successfully!",
        data: updatedResource
      });
    } catch (error) {
      console.error("Error updating resource:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while updating the resource. Please try again later." 
      });
    }
  });

  // Delete a resource
  app.delete("/resources/:id", async (req, res) => {
    try {
      const Resource = require("./models/resource");
      const { id } = req.params;
      const deletedResource = await Resource.findByIdAndDelete(id);
      
      if (!deletedResource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found."
        });
      }
      
      res.json({
        success: true,
        message: "Resource deleted successfully!",
        data: deletedResource
      });
    } catch (error) {
      console.error("Error deleting resource:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while deleting the resource. Please try again later." 
      });
    }
  });

app.listen(7000, () => {
  console.log("RUNNING ON PORT: 7000");
});
