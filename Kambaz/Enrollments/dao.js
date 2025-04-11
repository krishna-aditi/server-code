import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// export function getEnrollmentsByUser(userId) { 
//     const { enrollments } = Database;
//     return enrollments.filter((enrollment) => enrollment.user === userId);
// }

// export function enrollUserInCourse(courseId, userId) {
//     const { enrollments } = Database;
//     enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
// }

// export function unenrollUserFromCourse(courseId, userId) {
//     const { enrollments } = Database;
//     Database.enrollments = enrollments.filter(
//         (enrollment) => !( enrollment.user === userId && enrollment.course === courseId)
//     );
// }


// Find enrolled courses given userID 
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
// Find users enrolled given courseID
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}
// Enroll user from course
export function enrollUserInCourse(user, course) {
    return model.create({ user, course, _id: `${user}-${course}` });
}
// Unenroll user from course
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

