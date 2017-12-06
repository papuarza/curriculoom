/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const cerficationSchema = new Schema({
  userId:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  name: String,
  entity: String,
  year: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Certification = mongoose.model("Certification", cerficationSchema);
module.exports = Certification;
