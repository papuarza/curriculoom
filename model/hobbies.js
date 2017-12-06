/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const hobbieSchema = new Schema({
  userId:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  name: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Hobbie = mongoose.model("Hobbie", hobbieSchema);
module.exports = Hobbie;
