const express = require("express");
const router = express.Router();
const Forum = require("../models/forum");

// Getting All Forums
router.get("/", async (req, res) => {
    try {
        let forums = await Forum.find({});
        res.json(forums);
    } catch (error) {
        console.error("Error fetching forums:", error);
        res.status(500).json({ message: "Error fetching forums", error: error.message });
    }
});

module.exports = router;
