import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// Update module for course
export function updateModule(moduleId, moduleUpdates) {
    // const { modules } = Database;
    // const module = modules.find((module) => module._id === moduleId);
    // Object.assign(module, moduleUpdates);
    // return module;
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}

// Delete module for course
export function deleteModule(moduleId) {
    // const { modules } = Database;
    // Database.modules = modules.filter((module) => module._id !== moduleId);
    return model.deleteOne({ _id: moduleId });
}

// Create modules for course
export function createModule(module) {
    // const newModule = { ...module, _id: uuidv4() };
    // Database.modules = [...Database.modules, newModule];
    // return newModule;
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
}  

// Read modules for course
export function findModulesForCourse(courseId) {
    // const { modules } = Database;
    // return modules.filter((module) => module.course === courseId);
    return model.find({ course: courseId });
}


  


   