import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    // Get quizzes for course
    app.get("/api/courses/:courseId/quizzes", async (req, res) => {
        const { courseId } = req.params;
        try {
            const quizzes = await dao.findQuizzesForCourse(courseId);
            res.json(quizzes);
        } catch (error) {
            res.status(500).json({ error: "Error fetching quizzes" });
        }
    });

    // Get quiz by ID
    app.get("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        try {
            const quiz = await dao.findQuizById(quizId);
            res.json(quiz);
        } catch (error) {
            res.status(500).json({ error: "Error fetching quiz" });
        }
    });

    // Create new quiz
    app.post("/api/courses/:courseId/quizzes", async (req, res) => {
        const { courseId } = req.params;
        try {
            const quiz = {
                ...req.body,
                course: courseId,
                published: false  // Default to unpublished
            };
            const newQuiz = await dao.createQuiz(quiz);
            res.json(newQuiz);
        } catch (error) {
            res.status(500).json({ error: "Error creating quiz" });
        }
    });

    // Update quiz
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        try {
            const status = await dao.updateQuiz(quizId, req.body);
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: "Error updating quiz" });
        }
    });

    // Delete quiz
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        try {
            const status = await dao.deleteQuiz(quizId);
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: "Error deleting quiz" });
        }
    });

    // Toggle quiz publish status
    app.put("/api/quizzes/:quizId/publish", async (req, res) => {
        const { quizId } = req.params;
        try {
            const status = await dao.publishQuiz(quizId);
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: "Error toggling quiz publish status" });
        }
    });
}