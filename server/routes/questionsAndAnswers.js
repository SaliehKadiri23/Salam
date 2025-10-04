const express = require("express");
const router = express.Router();
const QuestionAndAnswer = require("../models/questionsAndAnswers");
const { isAuthenticated, isImamOrAdmin } = require("../middleware/auth");

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
router.post("/", isAuthenticated, async (req, res) => {
    try {
        const newQuestion = new QuestionAndAnswer({
            ...req.body,
            askedBy: req.user._id,
            dateAsked: new Date()
        });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Error adding question", error: error.message });
    }
});

// Updating a QuestionsAndAnswer
router.patch("/:id", isAuthenticated, async (req, res) => {
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
            // This is an imam/chief-imam answering/updating the question
            // Check if current user has imam or chief-imam role
            const isAdmin = req.user.profileInfo.role === 'chief-imam';
            const isImam = req.user.profileInfo.role === 'imam';
            
            if (!isAdmin && !isImam) {
                return res.status(403).json({ message: "Only imams and chief-imams can answer questions" });
            }
            
            updateData.answeredBy = req.user._id;
            updateData.dateAnswered = new Date();
            updateData.isAnswered = true;
        } else {
            // This is a user editing their question
            // Check if question is already answered
            if (existingQuestion.isAnswered) {
                return res.status(403).json({ message: "Cannot edit a question that has already been answered" });
            }

            // Check if the current user is the owner of the question
            const currentUserId = req.user._id;
            if (existingQuestion.askedBy.toString() !== currentUserId.toString()) {
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
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        let { id } = req.params;

        // Find the existing question
        const existingQuestion = await QuestionAndAnswer.findById(id);

        if (!existingQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the current user is either the owner of the question or an imam/chief-imam
        const currentUserId = req.user._id;
        const isAdmin = req.user.profileInfo.role === 'chief-imam';
        const isImam = req.user.profileInfo.role === 'imam';

        const isQuestionOwner = existingQuestion.askedBy.toString() === currentUserId.toString();

        // If user is not the owner and not an imam/chief-imam, deny access
        if (!isQuestionOwner && !isAdmin) {
            return res.status(403).json({ message: "You are not authorized to delete this question" });
        }

        // If question is answered and user is not an admin, deny access
        if (existingQuestion.isAnswered && !isAdmin) {
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
router.post("/:id/like", isAuthenticated, async (req, res) => {
    try {
        let { id } = req.params;
        const result = await QuestionAndAnswer.toggleLike(
            id,
            req.user._id // Use actual user ID from session
        );
        res.json(result);
    } catch (error) {
        console.log("Error!!!", error);
    }
});

module.exports = router;
