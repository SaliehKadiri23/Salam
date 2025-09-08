const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Article = require("./models/article")
const Forum = require("./models/forum")
const QuestionAndAnswer = require("./models/questionsAndAnswers");
const IslamicQuote = require("./models/islamicQuote");
const DuaRequest = require("./models/duaRequest");
const VolunteerOpportunity = require("./models/volunteerOpportunity");

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
      const newQuestion = new QuestionAndAnswer(req.body);
      await newQuestion.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error("Error adding question:", error);
      res.status(500).json({ message: "Error adding question", error: error.message });
    }
  });

  // Updating a QuestionsAndAnswer
  app.patch("/questions_and_answers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // Find the existing question
      const existingQuestion = await QuestionAndAnswer.findById(id);
      
      if (!existingQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      // Remove the _id from update data to avoid MongoDB error
      delete updateData._id;
      
      // Check if we're adding/updating an answer (scholar action)
      if (updateData.answer !== undefined) {
        // This is a scholar answering/updating the question
        // TODO: Replace with actual scholar authentication when implemented
        updateData.answeredBy = "68bc42e761037ccd9005230b"; // Hardcoded scholar ID
        updateData.dateAnswered = new Date();
        updateData.isAnswered = true;
      } else {
        // This is a user editing their question
        // Check if question is already answered
        if (existingQuestion.isAnswered) {
          return res.status(403).json({ message: "Cannot edit a question that has already been answered" });
        }
        
        // Check if the current user is the owner of the question
        // TODO: Replace with actual user authentication when implemented
        const currentUserId = "64f1abf1a2b4c3d4e5f6a701"; // Hardcoded for now
        if (existingQuestion.askedBy.toString() !== currentUserId) {
          return res.status(403).json({ message: "You are not authorized to edit this question" });
        }
      }
      
      const updatedQuestion = await QuestionAndAnswer.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      res.json(updatedQuestion);
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ message: "Error updating question", error: error.message });
    }
  });

  // Deleting a QuestionsAndAnswer
  app.delete("/questions_and_answers/:id", async (req, res) => {
    try {
      let { id } = req.params;
      
      // Find the existing question
      const existingQuestion = await QuestionAndAnswer.findById(id);
      
      if (!existingQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      // Check if the current user is either the owner of the question or a scholar
      // TODO: Replace with actual user authentication when implemented
      const currentUserId = "64f1abf1a2b4c3d4e5f6a701"; // Hardcoded user ID
      const currentScholarId = "68bc42e761037ccd9005230b"; // Hardcoded scholar ID
      
      const isQuestionOwner = existingQuestion.askedBy.toString() === currentUserId;
      const isScholar = currentScholarId === "68bc42e761037ccd9005230b"; // In a real app, this would check if the user is a scholar
      
      // If user is not the owner and not a scholar, deny access
      if (!isQuestionOwner && !isScholar) {
        return res.status(403).json({ message: "You are not authorized to delete this question" });
      }
      
      // If question is answered and user is not a scholar, deny access
      if (existingQuestion.isAnswered && !isScholar) {
        return res.status(403).json({ message: "Cannot delete a question that has already been answered" });
      }
      
      const result = await QuestionAndAnswer.findByIdAndDelete(id);
      console.log(`Deleted QA with id : ${id}`);
      res.send(result);
    } catch (error) {
      console.log("Error : ", error);
      res.status(500).json({ message: "Error deleting question", error: error.message });
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

  // ! Dua Requests
  // Get all Dua Requests
  app.get("/dua-requests", async (req, res) => {
    try {
      const duaRequests = await DuaRequest.find({}).sort({ createdAt: -1 });
      
      res.json({
        success: true,
        count: duaRequests.length,
        data: duaRequests
      });
    } catch (error) {
      console.error("Error fetching dua requests:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching dua requests. Please try again later." 
      });
    }
  });

  // Create a new Dua Request
  app.post("/dua-requests", async (req, res) => {
    try {
      // TODO: Replace with actual user authentication when implemented
      const currentUserId = "64f1abf1a2b4c3d4e5f6a111"; // Hardcoded for now
      
      const duaRequestData = {
        ...req.body,
        userId: currentUserId, // Associate with current user
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const newDuaRequest = new DuaRequest(duaRequestData);
      await newDuaRequest.save();
      
      res.status(201).json({
        success: true,
        message: "Dua request created successfully!",
        data: newDuaRequest
      });
    } catch (error) {
      console.error("Error creating dua request:", error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your input and try again." 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the dua request. Please try again later." 
      });
    }
  });

  // Update a Dua Request
  app.patch("/dua-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Find the existing dua request
      const existingDuaRequest = await DuaRequest.findById(id);
      
      if (!existingDuaRequest) {
        return res.status(404).json({
          success: false,
          message: "Dua request not found."
        });
      }
      
      // TODO: Replace with actual user authentication when implemented
      const currentUserId = "64f1abf1a2b4c3d4e5f6a111"; // Hardcoded for now
      const isAdmin = false; // Hardcoded for now
      
      // Check if user can update
      const canUpdate = isAdmin || 
                       (existingDuaRequest.userId && existingDuaRequest.userId.toString() === currentUserId);
      
      if (!canUpdate) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this dua request."
        });
      }
      
      // Update the dua request
      // Be explicit about which fields we're updating to avoid validation issues
      const updateData = {
        content: req.body.content,
        category: req.body.category,
        isAnonymous: existingDuaRequest.isAnonymous, // Preserve original isAnonymous value
        updatedAt: new Date()
      };
      
      // Handle author field based on anonymity status
      if (!existingDuaRequest.isAnonymous) {
        updateData.author = req.body.author; // Only include author for named posts
      }
      // For anonymous posts, we don't include the author field at all
      
      const updatedDuaRequest = await DuaRequest.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      res.json({
        success: true,
        message: "Dua request updated successfully!",
        data: updatedDuaRequest
      });
    } catch (error) {
      console.error("Error updating dua request:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while updating the dua request. Please try again later." 
      });
    }
  });

  // Delete a Dua Request
  app.delete("/dua-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Find the existing dua request
      const existingDuaRequest = await DuaRequest.findById(id);
      
      if (!existingDuaRequest) {
        return res.status(404).json({
          success: false,
          message: "Dua request not found."
        });
      }
      
      // TODO: Replace with actual user authentication when implemented
      const currentUserId = "64f1abf1a2b4c3d4e5f6a111"; // Hardcoded for now
      const isAdmin = false; // Hardcoded for now
      
      // Check if user can delete
      const canDelete = isAdmin || 
                       (existingDuaRequest.userId && existingDuaRequest.userId.toString() === currentUserId);
      
      if (!canDelete) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this dua request."
        });
      }
      
      const deletedDuaRequest = await DuaRequest.findByIdAndDelete(id);
      
      res.json({
        success: true,
        message: "Dua request deleted successfully!",
        data: deletedDuaRequest
      });
    } catch (error) {
      console.error("Error deleting dua request:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while deleting the dua request. Please try again later." 
      });
    }
  });

  // Increment prayer count for a Dua Request
  app.post("/dua-requests/:id/pray", async (req, res) => {
    try {
      const { id } = req.params;
      // TODO: Replace with req.user._id when auth is implemented
      const userId = "64f1abf1a2b4c3d4e5f6a111";
      
      const result = await DuaRequest.incrementPrayerCount(id, userId);
      res.json(result);
    } catch (error) {
      console.error("Error incrementing prayer count:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your prayer. Please try again later." 
      });
    }
  });

  // ! Volunteer Opportunities
  // Get all Volunteer Opportunities
  app.get("/volunteer-opportunities", async (req, res) => {
    try {
      const opportunities = await VolunteerOpportunity.find({ isActive: true }).sort({ createdAt: -1 });
      
      res.json({
        success: true,
        count: opportunities.length,
        data: opportunities
      });
    } catch (error) {
      console.error("Error fetching volunteer opportunities:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching volunteer opportunities. Please try again later." 
      });
    }
  });

  // Get a single Volunteer Opportunity by ID
  app.get("/volunteer-opportunities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const opportunity = await VolunteerOpportunity.findById(id);
      
      if (!opportunity) {
        return res.status(404).json({
          success: false,
          message: "Volunteer opportunity not found."
        });
      }
      
      res.json({
        success: true,
        data: opportunity
      });
    } catch (error) {
      console.error("Error fetching volunteer opportunity:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching the volunteer opportunity. Please try again later." 
      });
    }
  });

  // Create a new Volunteer Opportunity
  app.post("/volunteer-opportunities", async (req, res) => {
    try {
      const newOpportunity = new VolunteerOpportunity(req.body);
      await newOpportunity.save();
      
      res.status(201).json({
        success: true,
        message: "Volunteer opportunity created successfully!",
        data: newOpportunity
      });
    } catch (error) {
      console.error("Error creating volunteer opportunity:", error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your input and try again." 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the volunteer opportunity. Please try again later." 
      });
    }
  });

  // Update a Volunteer Opportunity
  app.patch("/volunteer-opportunities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const updatedOpportunity = await VolunteerOpportunity.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!updatedOpportunity) {
        return res.status(404).json({
          success: false,
          message: "Volunteer opportunity not found."
        });
      }
      
      res.json({
        success: true,
        message: "Volunteer opportunity updated successfully!",
        data: updatedOpportunity
      });
    } catch (error) {
      console.error("Error updating volunteer opportunity:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while updating the volunteer opportunity. Please try again later." 
      });
    }
  });

  // Delete a Volunteer Opportunity (soft delete)
  app.delete("/volunteer-opportunities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const updatedOpportunity = await VolunteerOpportunity.findByIdAndUpdate(
        id,
        { isActive: false, updatedAt: new Date() },
        { new: true }
      );
      
      if (!updatedOpportunity) {
        return res.status(404).json({
          success: false,
          message: "Volunteer opportunity not found."
        });
      }
      
      res.json({
        success: true,
        message: "Volunteer opportunity deleted successfully!",
        data: updatedOpportunity
      });
    } catch (error) {
      console.error("Error deleting volunteer opportunity:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while deleting the volunteer opportunity. Please try again later." 
      });
    }
  });

app.listen(7000, () => {
  console.log("RUNNING ON PORT: 7000");
});
