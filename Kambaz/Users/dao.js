// import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// let { users } = db;

export const createUser = (user) => {
    // (users = [...users, { ...user, _id: uuidv4() }]);
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
}
  

export const findAllUsers = () => 
    // users;
    model.find();

export const findUserById = (userId) => 
    // users.find((user) => user._id === userId);
    model.findById(userId);

export const findUserByUsername = (username) => 
    // users.find((user) => user.username === username);
    model.findOne({ username: username });

export const findUserByCredentials = (username, password) =>
    // users.find( (user) => user.username === username && user.password === password );
    model.findOne({ username, password });

export const updateUser = (userId, user) => 
    // (users = users.map((u) => (u._id === userId ? user : u)));
    model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => 
    // (users = users.filter((u) => u._id !== userId));
    model.deleteOne({ _id: userId });

// Find user by assigned role
export const findUsersByRole = (role) => 
    model.find({ role: role }); // or just model.find({ role })

// Find user by partial name
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };
  

