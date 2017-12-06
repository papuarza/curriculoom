/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const experienceSchema = new Schema({
  userId:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  company: String,
  jobTitle: String,
  startDate: String,
  endDate: String,
  jobDescription: String,
  city: String,
  country: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
