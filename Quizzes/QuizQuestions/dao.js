import QuizQuestions from "../../Database/quizquestions.js";
import Quizzes from "../../Database/quizzes.js";
import { v4 as uuidv4 } from "uuid";

// Create a new question and update the quiz's question count
export const createQuestion = (question) => {
    const newQuestion = { ...question, _id: uuidv4() };
    // Add the new question to the quizQuestions array
    QuizQuestions.push(newQuestion);

    // Increment the numberOfQuestions for the corresponding quiz
    const quiz = Quizzes.find((q) => q._id === question.quizId);
    if (quiz) {
        quiz.numberOfQuestions = (quiz.numberOfQuestions || 0) + 1;
    }
    return newQuestion;
};

// Find and return all questions for a quiz, sorted by order,
// and update the quiz with the correct number of questions
export const findQuestionsForQuiz = (quizId) => {
    const questions = QuizQuestions
        .filter((q) => q.quizId === quizId)
        .sort((a, b) => a.order - b.order);

    const quiz = Quizzes.find((q) => q._id === quizId);
    if (quiz) {
        quiz.numberOfQuestions = questions.length;
    }
    return questions;
};

// Find a single question by its ID
export const findQuestionById = (questionId) => {
    return QuizQuestions.find((q) => q._id === questionId);
};

// Update an existing question using provided updates
export const updateQuestion = (questionId, questionUpdates) => {
    const question = QuizQuestions.find((q) => q._id === questionId);
    if (question) {
        Object.assign(question, questionUpdates);
    }
    return question;
};

// Delete a question by its ID and decrement the quiz's question count
export const deleteQuestion = (questionId) => {
    const question = QuizQuestions.find((q) => q._id === questionId);
    if (!question) return;

    // Remove the question from the array
    const index = QuizQuestions.findIndex((q) => q._id === questionId);
    if (index !== -1) {
        QuizQuestions.splice(index, 1);
    }

    // Decrement the numberOfQuestions for the corresponding quiz
    const quiz = Quizzes.find((q) => q._id === question.quizId);
    if (quiz) {
        quiz.numberOfQuestions = Math.max((quiz.numberOfQuestions || 1) - 1, 0);
    }
};

// Reorder questions for a quiz based on an array of {questionId, order}
export const reorderQuestions = (quizId, questionOrders) => {
    questionOrders.forEach(({ questionId, order }) => {
        const question = QuizQuestions.find(
            (q) => q._id === questionId && q.quizId === quizId
        );
        if (question) {
            question.order = order;
        }
    });
};

// Calculate the total points for all questions in a quiz
export const calculateQuizPoints = (quizId) => {
    const totalPoints = QuizQuestions
        .filter((q) => q.quizId === quizId)
        .reduce((sum, question) => sum + question.points, 0);
    return totalPoints;
};