/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const academicSchema = new Schema({
  userId:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  institute: String,
  degreeTitle: String,
  degreeLevel: String,
  startDate: String,
  endDate: String,
  description: String,
  city: String,
  country: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Academic = mongoose.model("Academic", academicSchema);
module.exports = Academic;
