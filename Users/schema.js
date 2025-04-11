import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: String, // primary key name is _id of type String
    username: { type: String, required: true, unique: true }, // String field that is required and unique
    password: { type: String, required: true }, // String field that in required but not unique
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
        type: String,
        enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
        default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
    },
    { collection: "users" } // store data in "users" collection
);
export default userSchema;