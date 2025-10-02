const express = require("express");
const router = express.Router();
const QuestionAndAnswer = require("../models/questionsAndAnswers");

// Getting All Questions And Answers
router.get("/", async (req, res) => {
    try {
        let questionsAndAnswers = await QuestionAndAnswer.find({});
        res.json(questionsAndAnswers);
    } catch (error) {
        console.error("Error fetching questions and answers:", error);
        res.status(500).json({ message: "Error fetching questions and answers", error: error.message });
    }
});

// Adding a QuestionsAndAnswer
router.post("/", async (req, res) => {
    try {
        const newQuestion = new QuestionAndAnswer(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Error adding question", error: error.message });
    }
});

// Updating a QuestionsAndAnswer
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the existing question
        const existingQuestion = await QuestionAndAnswer.findById(id);

        if (!existingQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Remove the _id from update data to avoid MongoDB error
        delete updateData._id;

        // Check if we're adding/updating an answer (scholar action)
        if (updateData.answer !== undefined) {
            // This is a scholar answering/updating the question
            // TODO: Replace with actual scholar authentication when implemented
            updateData.answeredBy = "68bc42e761037ccd9005230b"; // Hardcoded scholar ID
            updateData.dateAnswered = new Date();
            updateData.isAnswered = true;
        } else {
            // This is a user editing their question
            // Check if question is already answered
            if (existingQuestion.isAnswered) {
                return res.status(403).json({ message: "Cannot edit a question that has already been answered" });
            }

            // Check if the current user is the owner of the question
            // TODO: Replace with actual user authentication when implemented
            const currentUserId = "64f1abf1a2b4c3d4e5f6a701"; // Hardcoded for now
            if (existingQuestion.askedBy.toString() !== currentUserId) {
                return res.status(403).json({ message: "You are not authorized to edit this question" });
            }
        }

        const updatedQuestion = await QuestionAndAnswer.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.json(updatedQuestion);
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ message: "Error updating question", error: error.message });
    }
});

// Deleting a QuestionsAndAnswer
router.delete("/:id", async (req, res) => {
    try {
        let { id } = req.params;

        // Find the existing question
        const existingQuestion = await QuestionAndAnswer.findById(id);

        if (!existingQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the current user is either the owner of the question or a scholar
        // TODO: Replace with actual user authentication when implemented
        const currentUserId = "64f1abf1a2b4c3d4e5f6a701"; // Hardcoded user ID
        const currentScholarId = "68bc42e761037ccd9005230b"; // Hardcoded scholar ID

        const isQuestionOwner = existingQuestion.askedBy.toString() === currentUserId;
        const isScholar = currentScholarId === "68bc42e761037ccd9005230b"; // In a real app, this would check if the user is a scholar

        // If user is not the owner and not a scholar, deny access
        if (!isQuestionOwner && !isScholar) {
            return res.status(403).json({ message: "You are not authorized to delete this question" });
        }

        // If question is answered and user is not a scholar, deny access
        if (existingQuestion.isAnswered && !isScholar) {
            return res.status(403).json({ message: "Cannot delete a question that has already been answered" });
        }

        const result = await QuestionAndAnswer.findByIdAndDelete(id);
        console.log(`Deleted QA with id : ${id}`);
        res.send(result);
    } catch (error) {
        console.log("Error : ", error);
        res.status(500).json({ message: "Error deleting question", error: error.message });
    }
});

// Liking/Un-liking a QuestionsAndAnswer
router.post("/:id/like", async (req, res) => {
    try {
        let { id } = req.params;
        const result = await QuestionAndAnswer.toggleLike(
            id,
            "64f1abf1a2b4c3d4e5f6a111"
            // TODO : IN SHA ALLAH - Replace with req.user._id when auth done
        );
        res.json(result);
    } catch (error) {
        console.log("Error!!!", error);
    }
});

module.exports = router;
