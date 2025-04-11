import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// Update assignment for course
export function updateAssignment(assignmentId, assignmentUpdates) {
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}

// Delete assignment for course
export function deleteAssignment(assignmentId) {
    // const { assignments } = Database;
    // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    return model.deleteOne({ _id: assignmentId })
}

// Create assignment for course
export function createAssignment(assignment) {
    // const newAssignment = { ...assignment, _id: uuidv4() };
    // Database.assignments = [...Database.assignments, newAssignment];
    // return newAssignment;
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);
}  

// Read assignments for course
export function findAssignmentsForCourse(courseId) {
    // const { assignments } = Database;
    // return assignments.filter((assignment) => assignment.course === courseId);
    return model.find({ course: courseId });
}
