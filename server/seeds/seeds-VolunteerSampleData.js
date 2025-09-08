const mongoose = require('mongoose');
const VolunteerOpportunity = require('../models/volunteerOpportunity');

const dbUrl = "mongodb://127.0.0.1:27017/salam";

mongoose.connect(dbUrl)
  .then(async () => {
    console.log("Connected to database");

    // Clear existing data
    await VolunteerOpportunity.deleteMany({});
    console.log("Cleared existing volunteer opportunities");

    // Sample volunteer opportunities
    const sampleOpportunities = [
      {
        category: "Mosque Events",
        title: "Event Coordinator",
        organization: "Islamic Center of Al-Madinah",
        description: "Assist in planning and executing mosque events, including religious holidays and community gatherings. Responsibilities include coordinating with vendors, managing volunteers, and ensuring smooth execution of events.",
        location: "Al-Madinah",
        timeCommitment: "10-15 hours/week",
        skillLevel: "Intermediate",
        skills: ["Event Planning", "Communication", "Organization"],
        urgency: "high",
        spotsAvailable: 3,
        image: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        remote: false
      },
      {
        category: "Mosque Events",
        title: "Volunteer Assistant",
        organization: "Al-Noor Mosque",
        description: "Provide support during events, including setup, registration, and assisting attendees. This is a great opportunity for those looking to get involved in community service.",
        location: "Al-Noor",
        timeCommitment: "5-8 hours/week",
        skillLevel: "Beginner",
        skills: ["Customer Service", "Organization"],
        urgency: "medium",
        spotsAvailable: 8,
        image: "https://images.unsplash.com/photo-1590642337446-6e33e47cea57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        remote: false
      },
      {
        category: "Educational Programs",
        title: "Teaching Assistant",
        organization: "Al-Falah Academy",
        description: "Support teachers in delivering educational programs for children and adults, including Islamic studies and language classes. Help with classroom management and one-on-one tutoring.",
        location: "Al-Falah",
        timeCommitment: "8-12 hours/week",
        skillLevel: "Intermediate",
        skills: ["Teaching", "Arabic", "Islamic Studies"],
        urgency: "high",
        spotsAvailable: 5,
        image: "dwioeiwi",
        remote: true
      },
      {
        category: "Educational Programs",
        title: "Tutor",
        organization: "Darul Uloom Institute",
        description: "Provide one-on-one or small group tutoring to students in various subjects, including Quranic studies and academic subjects. Flexible scheduling available.",
        location: "Remote",
        timeCommitment: "6-10 hours/week",
        skillLevel: "Advanced",
        skills: ["Tutoring", "Quranic Studies", "Mathematics"],
        urgency: "medium",
        spotsAvailable: 12,
        image: "format&fit=crop&w=800&q=80",
        remote: true
      },
      {
        category: "Community Outreach",
        title: "Outreach Coordinator",
        organization: "Muslim Community Services",
        description: "Help organize and participate in community outreach activities, such as food drives, charity events, and interfaith dialogues. Make a positive impact in your community.",
        location: "Multiple Locations",
        timeCommitment: "12-20 hours/week",
        skillLevel: "Intermediate",
        skills: ["Community Outreach", "Event Planning", "Public Speaking"],
        urgency: "high",
        spotsAvailable: 2,
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        remote: false
      },
      {
        category: "Community Outreach",
        title: "Volunteer Driver",
        organization: "Islamic Relief Organization",
        description: "Assist in transporting goods, supplies, or individuals to and from community events and service locations. Valid driver's license required.",
        location: "Various",
        timeCommitment: "4-8 hours/week",
        skillLevel: "Beginner",
        skills: ["Driving", "Customer Service", "Reliability"],
        urgency: "low",
        spotsAvailable: 15,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        remote: false
      }
    ];

    // Insert sample data
    await VolunteerOpportunity.insertMany(sampleOpportunities);
    console.log("Sample volunteer opportunities created successfully!");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    mongoose.connection.close();
  });