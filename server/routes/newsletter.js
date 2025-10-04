const express = require("express");
const router = express.Router();
const Newsletter = require("../models/newsletter");
const { isAdmin } = require("../middleware/auth");

// Adding a Newsletter (public route for anyone to sign up)
router.post("/", async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Newsletter signup request:", email);

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
router.get("/", isAdmin, async (req, res) => {
    try {
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

module.exports = router;
