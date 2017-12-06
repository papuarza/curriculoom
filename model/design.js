/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const designSchema = new Schema({
  name: String,
  image: String,
  experiences: Number,
  academics: Number,
  skills: Number,
  courses: Number,
  hobbies: Number,
  languages: Number
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Design = mongoose.model("Design", designSchema);
module.exports = Design;