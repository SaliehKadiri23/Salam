const express = require("express");
const router = express.Router();
const Article = require("../models/article");

// Getting All Articles
router.get("/", async (req, res) => {
    try {
        let allArticles = await Article.find({});
        res.json(allArticles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ message: "Error fetching articles", error: error.message });
    }
});

// Adding an Article
router.post("/", async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Error adding article:", error);
        res.status(500).json({ message: "Error adding article", error: error.message });
    }
});

// Updating an Article
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
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
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
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
router.post("/:id/like", async (req, res) => {
    try {
        const { id } = req.params;
        // TODO: Replace with req.user._id when auth is implemented
        const userId = "64f1abf1a2b4c3d4e5f6a111"; // Hardcoded for now
        const result = await Article.toggleLike(id, userId);
        res.json(result);
    } catch (error) {
        console.error("Error toggling article like:", error);
        res.status(500).json({ message: "Error toggling like", error: error.message });
    }
});

module.exports = router;
