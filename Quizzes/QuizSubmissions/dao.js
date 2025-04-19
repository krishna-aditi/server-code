import QuizSubmissions from "../../Database/quizsubmissions.js";
import { v4 as uuidv4 } from "uuid";

// Create a new quiz submission and add it to the in-memory database
export const createSubmission = (submission) => {
    const newSubmission = { ...submission, _id: uuidv4() };
    QuizSubmissions.push(newSubmission);
    return newSubmission;
};

// Find and return a submission by its ID
export const findSubmissionById = (submissionId) => {
    return QuizSubmissions.find(
        (submission) => submission._id === submissionId
    );
};

// Find all submissions for a given quiz and student, sorted descending by attemptNumber
export const findSubmissionsForQuiz = (quizId, studentId) => {
    return QuizSubmissions
        .filter(
            (submission) =>
                submission.quizId === quizId && submission.studentId === studentId
        )
        .sort((a, b) => b.attemptNumber - a.attemptNumber);
};

// Find the latest attempt number for a given quiz and student
export const findLatestAttemptNumber = (quizId, studentId) => {
    const submissions = QuizSubmissions
        .filter(
            (submission) =>
                submission.quizId === quizId && submission.studentId === studentId
        )
        .sort((a, b) => b.attemptNumber - a.attemptNumber);
    return submissions.length > 0 ? submissions[0].attemptNumber : 0;
};

// Update submission scores and individual answer scores in the in-memory database
export const updateSubmissionScores = (submissionId, updates) => {
    const submission = QuizSubmissions.find(
        (sub) => sub._id === submissionId
    );
    if (!submission) return null;

    // Update individual answer scores based on provided updates.answers array
    submission.answers = submission.answers.map((answer) => {
        const update = updates.answers.find(
            (u) => u.questionId === answer.questionId
        );
        if (update) {
            return { ...answer, points: update.points };
        }
        return answer;
    });

    // Recalculate total score and percentage based on maxScore
    const totalScore = submission.answers.reduce(
        (sum, ans) => sum + ans.points,
        0
    );
    const percentage = Math.round((totalScore / submission.maxScore) * 100);

    submission.score = totalScore;
    submission.percentage = percentage;

    return submission;
};
