const express = require("express");
const router = express.Router();
const IslamicQuote = require("../models/islamicQuote");

// Get all Islamic quotes
router.get("/", async (req, res) => {
    try {
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
router.get("/quote-of-the-day", async (req, res) => {
    try {
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
router.get("/latest", async (req, res) => {
    try {
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
router.post("/", async (req, res) => {
    try {
        const { text, reference, category, isQuoteOfTheDay } = req.body;
        
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
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { text, reference, category, isQuoteOfTheDay, isActive } = req.body;
        
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
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
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

module.exports = router;
