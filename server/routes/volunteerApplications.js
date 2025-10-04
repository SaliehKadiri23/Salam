const express = require("express");
const router = express.Router();
const VolunteerApplication = require("../models/volunteerApplication");
const VolunteerOpportunity = require("../models/volunteerOpportunity");
const { isAuthenticated, isImamOrAdmin } = require("../middleware/auth");

// Create a new Volunteer Application
router.post("/", async (req, res) => {
    try {
      const { volunteerOpportunity, fullName, email, phone, availability, experience, motivation } = req.body;
      
      // Log the incoming request for debugging
      console.log("Incoming volunteer application request:", req.body);
      
      // Check if opportunity exists and is active
      const opportunity = await VolunteerOpportunity.findById(volunteerOpportunity);
      if (!opportunity || !opportunity.isActive) {
        return res.status(404).json({
          success: false,
          message: "Volunteer opportunity not found or no longer available."
        });
      }
      
      // Check if user has already applied
      const existingApplication = await VolunteerApplication.findOne({
        volunteerOpportunity,
        email
      });
      
      if (existingApplication) {
        return res.status(400).json({
          success: false,
          message: "You have already applied for this opportunity."
        });
      }
      
      // Validate availability
      const validAvailabilities = ["weekdays", "weekends", "evenings", "flexible"];
      if (!availability || !validAvailabilities.includes(availability)) {
        return res.status(400).json({
          success: false,
          message: "Please select a valid availability option."
        });
      }
      
      // Validate motivation length
      if (!motivation || motivation.length < 10) {
        return res.status(400).json({
          success: false,
          message: "Motivation must be at least 10 characters long."
        });
      }
      
      // Create new application
      const newApplication = new VolunteerApplication({
        volunteerOpportunity,
        fullName,
        email,
        phone,
        availability,
        experience: experience || "",
        motivation
      });
      
      await newApplication.save();
      
      // Populate the opportunity details for the response
      await newApplication.populate('volunteerOpportunity', 'title organization');
      
      res.status(201).json({
        success: true,
        message: "Application submitted successfully!",
        data: newApplication
      });
    } catch (error) {
      console.error("Error creating volunteer application:", error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your input and try again." 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your application. Please try again later." 
      });
    }
  });

  // Get all applicants for a specific Volunteer Opportunity
  router.get("/opportunity/:id/applicants", isImamOrAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if opportunity exists
      const opportunity = await VolunteerOpportunity.findById(id);
      if (!opportunity) {
        return res.status(404).json({
          success: false,
          message: "Volunteer opportunity not found."
        });
      }
      
      // Get all applications for this opportunity
      const applications = await VolunteerApplication.find({
        volunteerOpportunity: id
      }).sort({ appliedAt: -1 });
      
      res.json({
        success: true,
        count: applications.length,
        data: applications
      });
    } catch (error) {
      console.error("Error fetching volunteer applicants:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching applicants. Please try again later." 
      });
    }
  });

  // Update applicant status
  router.patch("/:id", isImamOrAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      // Validate status
      if (!['pending', 'accepted', 'rejected'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be 'pending', 'accepted', or 'rejected'."
        });
      }
      
      // Update application status
      const updatedApplication = await VolunteerApplication.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      
      if (!updatedApplication) {
        return res.status(404).json({
          success: false,
          message: "Application not found."
        });
      }
      
      // Populate the opportunity details for the response
      await updatedApplication.populate('volunteerOpportunity', 'title organization');
      
      res.json({
        success: true,
        message: `Application ${status} successfully!`,
        data: updatedApplication
      });
    } catch (error) {
      console.error("Error updating volunteer application:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while updating the application. Please try again later." 
      });
    }
  });

module.exports = router;