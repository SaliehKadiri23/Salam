const express = require("express");
const router = express.Router();
const Resource = require("../models/resource");

// Get all resources
router.get("/", async (req, res) => {
    try {
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
router.get("/:id", async (req, res) => {
    try {
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
router.post("/", async (req, res) => {
    try {
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
router.patch("/:id", async (req, res) => {
    try {
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
router.delete("/:id", async (req, res) => {
    try {
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

module.exports = router;
