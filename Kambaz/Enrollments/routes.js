import * as enrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
    // Get enrollments of current user
    app.get("/api/enrollments/:userId", (req, res) => { 
        const { userId } = req.params;
        const enrollments = enrollmentsDao.getEnrollmentsByUser(userId);
        res.send(enrollments);
    });

    // Enroll current user in a course
    app.post("/api/enrollments/:courseId/:userId", (req, res) => { 
        const { courseId, userId } = req.params;
        const status = enrollmentsDao.enrollUserInCourse(courseId, userId);
        res.send(status);
    });

    // Unenroll current user from a course
    app.delete("/api/enrollments/:courseId/:userId", (req, res) => { 
        const { courseId, userId } = req.params;
        const status = enrollmentsDao.unenrollUserFromCourse(courseId, userId);
        res.send(status);
    });
}