import * as dao from "./dao.js";
import * as quizDao from "../dao.js";

export default function QuestionRoutes(app) {
    // Get all questions for a quiz
    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        try {
            const questions = await dao.findQuestionsForQuiz(quizId);
            res.json(questions);
        } catch (error) {
            res.status(500).json({ error: "Error fetching questions" });
        }
    });

    // Get question by ID
    app.get("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        try {
            const question = await dao.findQuestionById(questionId);
            res.json(question);
        } catch (error) {
            res.status(500).json({ error: "Error fetching question" });
        }
    });

    // Create new question
    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        try {
            // Get the quiz to verify it exists and get courseId
            const quiz = await quizDao.findQuizById(quizId);
            if (!quiz) {
                return res.status(404).json({ error: "Quiz not found" });
            }

            // Get current questions count for ordering
            const currentQuestions = await dao.findQuestionsForQuiz(quizId);

            const question = {
                ...req.body,
                quizId,
                courseId: quiz.course,
                order: currentQuestions.length
            };

            const newQuestion = await dao.createQuestion(question);

            // Update total points in quiz
            const totalPoints = await dao.calculateQuizPoints(quizId);
            await quizDao.updateQuiz(quizId, { numberOfQuestions: currentQuestions.length + 1, points: totalPoints });

            res.json(newQuestion);
        } catch (error) {
            res.status(500).json({ error: "Error creating question" });
        }
    });

    // Update question
    app.put("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        try {
            const question = await dao.findQuestionById(questionId);
            if (!question) {
                return res.status(404).json({ error: "Question not found" });
            }

            const status = await dao.updateQuestion(questionId, req.body);

            // Update total points in quiz
            const totalPoints = await dao.calculateQuizPoints(question.quizId);
            await quizDao.updateQuiz(question.quizId, { points: totalPoints });

            res.json(status);
        } catch (error) {
            res.status(500).json({ error: "Error updating question" });
        }
    });

    // Delete question
    app.delete("/api/questions/:questionId", async (req, res) => {
        const { questionId } = req.params;
        try {
            const question = await dao.findQuestionById(questionId);
            if (!question) {
                return res.status(404).json({ error: "Question not found" });
            }

            const status = await dao.deleteQuestion(questionId);

            // Update quiz question count and points
            const currentQuestions = await dao.findQuestionsForQuiz(question.quizId);
            const totalPoints = await dao.calculateQuizPoints(question.quizId);
            await quizDao.updateQuiz(question.quizId, {
                numberOfQuestions: currentQuestions.length,
                points: totalPoints
            });

            res.json(status);
        } catch (error) {
            res.status(500).json({ error: "Error deleting question" });
        }
    });

    // Reorder questions
    app.put("/api/quizzes/:quizId/questions/reorder", async (req, res) => {
        const { quizId } = req.params;
        const { questionOrders } = req.body;
        try {
            const status = await dao.reorderQuestions(quizId, questionOrders);
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: "Error reordering questions" });
        }
    });
}