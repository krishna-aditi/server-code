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
    // return enrollments.map((enrollment) => enrollment.course);
    return enrollments.filter((e) => e.user !== null).map((enrollment) => enrollment.course);
}
   
// Find users enrolled given courseID
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.filter((e) => e.course !== null).map((enrollment) => enrollment.user);
}
// export function enrollUserInCourse(user, course) {
//     const newEnrollment = { user, course, _id: `${user}-${course}` };
//     return model.create(newEnrollment);
// }
export async function enrollUserInCourse(user, course) {
    try {
        // Check if enrollment already exists
        const existingEnrollment = await model.findOne({ user, course });
        if (existingEnrollment) {
            return existingEnrollment; // Return existing enrollment if found
        }
        
        // Create new enrollment if it doesn't exist
        return await model.create({ user, course, _id: `${user}-${course}` });
    } catch (error) {
        // Handle duplicate key error (in case of race condition)
        if (error.code === 11000) {
            // If we get a duplicate key error, the enrollment already exists
            // Fetch and return the existing enrollment
            return await model.findOne({ user, course });
        }
        throw error; // Re-throw other errors
    }
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}
   

