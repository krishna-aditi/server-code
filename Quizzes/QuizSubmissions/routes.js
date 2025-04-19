import * as dao from "./dao.js";

export default function QuizSubmissionRoutes(app) {
    // Submit a quiz
    app.post("/api/quizzes/:quizId/submit", async (req, res) => {
        const { quizId } = req.params;
        const { studentId, answers, startTime, endTime } = req.body;

        try {
            // Get latest attempt number
            const latestAttempt = await dao.findLatestAttemptNumber(quizId, studentId);

            const submission = {
                ...req.body,
                quizId,
                attemptNumber: latestAttempt + 1,
                status: 'completed',
                timeSpent: Math.round((new Date(endTime) - new Date(startTime)) / (1000 * 60))
            };

            const newSubmission = await dao.createSubmission(submission);
            res.json(newSubmission);
        } catch (error) {
            res.status(500).json({ error: "Error submitting quiz" });
        }
    });

    // Get all submissions for a quiz
    app.get("/api/quizzes/:quizId/submissions/:studentId", async (req, res) => {
        const { quizId, studentId } = req.params;
        try {
            const submissions = await dao.findSubmissionsForQuiz(quizId, studentId);
            res.json(submissions);
        } catch (error) {
            res.status(500).json({ error: "Error fetching submissions" });
        }
    });

    // Get specific submission
    app.get("/api/submissions/:submissionId", async (req, res) => {
        const { submissionId } = req.params;
        try {
            const submission = await dao.findSubmissionById(submissionId);
            res.json(submission);
        } catch (error) {
            res.status(500).json({ error: "Error fetching submission" });
        }
    });

    app.put("/api/submissions/:submissionId/scores", async (req, res) => {
        const { submissionId } = req.params;
        const { updates, role } = req.body;

        try {
            // Check if user is faculty or admin
            if (role !== 'FACULTY' && role !== 'ADMIN') {
                return res.status(403).json({ error: "Unauthorized to update scores" });
            }

            const updatedSubmission = await dao.updateSubmissionScores(submissionId, updates);

            if (!updatedSubmission) {
                return res.status(404).json({ error: "Submission not found" });
            }

            res.json(updatedSubmission);
        } catch (error) {
            res.status(500).json({ error: "Error updating submission scores" });
        }
    });
}