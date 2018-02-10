/*jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
  name: String,
  email: String,
  message: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;