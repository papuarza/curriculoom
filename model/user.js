const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  lastName: String,
  city: String,
  country: String,
  phone: String,
  email: String,
  linkedin: String,
  web: String,
  profession: String,
  imgName: {type: String, default: "man.png"},
  urlImg: {type: String, default: "https://i.pinimg.com/236x/64/57/c2/6457c2ea29e1ede7e4d7b6de3f7181fb--avatar-wordpress.jpg"}
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
