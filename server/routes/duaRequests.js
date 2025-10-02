const express = require("express");
const router = express.Router();
const DuaRequest = require("../models/duaRequest");

// Get all Dua Requests
router.get("/", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
router.post("/:id/pray", async (req, res) => {
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

module.exports = router;
