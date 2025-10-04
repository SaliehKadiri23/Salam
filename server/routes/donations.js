const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Get all donations
router.get("/", isAdmin, async (req, res) => {
    try {
      const donations = await Donation.find({}).sort({ donationDate: -1 });
      
      res.json({
        success: true,
        count: donations.length,
        data: donations
      });
    } catch (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching donations. Please try again later." 
      });
    }
  });

  // Get a single donation by ID
  router.get("/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const donation = await Donation.findById(id);
      
      if (!donation) {
        return res.status(404).json({
          success: false,
          message: "Donation not found."
        });
      }
      
      res.json({
        success: true,
        data: donation
      });
    } catch (error) {
      console.error("Error fetching donation:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching the donation. Please try again later." 
      });
    }
  });

  // Create a new donation
  router.post("/", async (req, res) => {
    try {
      let donationData = {
        ...req.body
      };
      
      // If the user is authenticated, associate the donation with their account
      if (req.isAuthenticated() && req.user) {
        donationData.donorId = req.user._id;
        // Optionally update donor name/email from user profile if not provided
        if (!donationData.donorName) {
          donationData.donorName = req.user.profileInfo.fullName;
        }
        if (!donationData.donorEmail) {
          donationData.donorEmail = req.user.profileInfo.email;
        }
      }
      
      const newDonation = new Donation(donationData);
      await newDonation.save();
      
      res.status(201).json({
        success: true,
        message: "Donation created successfully!",
        data: newDonation
      });
    } catch (error) {
      console.error("Error creating donation:", error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your input and try again." 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the donation. Please try again later." 
      });
    }
  });

  // Update a donation
  router.patch("/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      const updatedDonation = await Donation.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!updatedDonation) {
        return res.status(404).json({
          success: false,
          message: "Donation not found."
        });
      }
      
      res.json({
        success: true,
        message: "Donation updated successfully!",
        data: updatedDonation
      });
    } catch (error) {
      console.error("Error updating donation:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while updating the donation. Please try again later." 
      });
    }
  });

  // Delete a donation
  router.delete("/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedDonation = await Donation.findByIdAndDelete(id);
      
      if (!deletedDonation) {
        return res.status(404).json({
          success: false,
          message: "Donation not found."
        });
      }
      
      res.json({
        success: true,
        message: "Donation deleted successfully!",
        data: deletedDonation
      });
    } catch (error) {
      console.error("Error deleting donation:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while deleting the donation. Please try again later." 
      });
    }
  });

module.exports = router;
