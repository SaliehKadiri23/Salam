const express = require("express");
const router = express.Router();
const VolunteerOpportunity = require("../models/volunteerOpportunity");
const VolunteerApplication = require("../models/volunteerApplication");
const { isAuthenticated, isImamOrAdmin } = require("../middleware/auth");

// Get all Volunteer Opportunities
router.get("/", async (req, res) => {
    try {
        const opportunities = await VolunteerOpportunity.find({ isActive: true }).sort({ createdAt: -1 });
        
        // Add application count to each opportunity
        const opportunitiesWithCount = await Promise.all(opportunities.map(async (opportunity) => {
            const applicationsCount = await VolunteerApplication.countDocuments({
                volunteerOpportunity: opportunity._id
            });
            return {
                ...opportunity.toObject(),
                applicationsCount
            };
        }));
        
        res.json({
            success: true,
            count: opportunitiesWithCount.length,
            data: opportunitiesWithCount
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
router.get("/:id", async (req, res) => {
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
router.post("/", isImamOrAdmin, async (req, res) => {
    try {
        const newOpportunity = new VolunteerOpportunity({
            ...req.body,
            createdBy: req.user._id  // Track who created the opportunity
        });
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
router.patch("/:id", isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the existing opportunity
        const opportunity = await VolunteerOpportunity.findById(id);
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "Volunteer opportunity not found."
            });
        }
        
        // Only allow chief-imam to edit any opportunity, or allow the creator to edit their own opportunity
        const isOwner = opportunity.createdBy && opportunity.createdBy.toString() === req.user._id.toString();
        const isAdmin = req.user.profileInfo.role === 'chief-imam';
        
        if (!(isAdmin || isOwner)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this volunteer opportunity."
            });
        }
        
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
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the existing opportunity
        const opportunity = await VolunteerOpportunity.findById(id);
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                message: "Volunteer opportunity not found."
            });
        }
        
        // Only allow chief-imam to delete any opportunity, or allow the creator to delete their own opportunity
        const isOwner = opportunity.createdBy && opportunity.createdBy.toString() === req.user._id.toString();
        const isAdmin = req.user.profileInfo.role === 'chief-imam';
        
        if (!(isAdmin || isOwner)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this volunteer opportunity."
            });
        }
        
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

module.exports = router;
