const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const { isAuthenticated, isImamOrAdmin } = require("../middleware/auth");

// Getting All Articles
router.get("/", async (req, res) => {
    try {
        let allArticles = await Article.find({}).populate('author', 'profileInfo.fullName profileInfo.email profileInfo.role');
        res.json({
            success: true,
            count: allArticles.length,
            data: allArticles
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ success: false, message: "Error fetching articles", error: error.message });
    }
});

// Adding an Article
router.post("/", isImamOrAdmin, async (req, res) => {
    try {
        // Set the author to the authenticated user's ID
        const newArticle = new Article({
            ...req.body,
            author: req.user._id
        });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Error adding article:", error);
        res.status(500).json({ message: "Error adding article", error: error.message });
    }
});

// Updating an Article
router.patch("/:id", isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        // Check if user is owner of the article or is admin
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        
        // Only allow chief-imam to edit any article, or allow the author to edit their own article
        // An imam cannot edit another imam's article
        const isOwner = article.author.toString() === req.user._id.toString();
        const isAdmin = req.user.profileInfo.role === 'chief-imam';
        
        if (!(isAdmin || isOwner)) {
            return res.status(403).json({ message: "You are not authorized to update this article" });
        }
        
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(updatedArticle);
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).json({ message: "Error updating article", error: error.message });
    }
});

// Deleting an Article
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        // Check if user is owner of the article or is admin
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        
        // Only allow chief-imam to delete any article, or allow the author to delete their own article
        // An imam cannot delete another imam's article
        const isOwner = article.author.toString() === req.user._id.toString();
        const isAdmin = req.user.profileInfo.role === 'chief-imam';
        
        if (!(isAdmin || isOwner)) {
            return res.status(403).json({ message: "You are not authorized to delete this article" });
        }
        
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json({ message: "Article deleted successfully" });
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ message: "Error deleting article", error: error.message });
    }
});

// Liking/Un-liking an Article
router.post("/:id/like", isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id; // Use actual user ID from session
        const result = await Article.toggleLike(id, userId);
        res.json(result);
    } catch (error) {
        console.error("Error toggling article like:", error);
        res.status(500).json({ message: "Error toggling like", error: error.message });
    }
});

module.exports = router;
