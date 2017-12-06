/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const skillSchema = new Schema({
  userId:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  skill: String,
  level: Number,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
