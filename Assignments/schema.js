import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    "description": String,
    "points": Number,
    "availabledate": Date,
    "duedate": Date,
  },
  { collection: "assignments" }
);
export default schema;