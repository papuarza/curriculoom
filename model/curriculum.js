/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const curriculumSchema = new Schema({
    design: {
        type: Schema.Types.ObjectId,
        ref: 'Design'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    experiences: [{
        type: Schema.Types.ObjectId,
        ref: 'Experience'
    }],
    academics: [{
        type: Schema.Types.ObjectId,
        ref: 'Academic'
    }],
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Certification'
    }],
    hobbies: [{
        type: Schema.Types.ObjectId,
        ref: 'Hobbie'
    }],
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    color: String,
    preview: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVkp4ZmqvROWCVPMj-5IkbHgjDW9TunSFUDqfkRsfavMKz_PTU0A"},
    name: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Curriculum = mongoose.model("Curriculum", curriculumSchema);
module.exports = Curriculum;