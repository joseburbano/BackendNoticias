const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  names: String,
  surnames: String,
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  fechaCreate: Date,
  userUpdate: Date,
  fechaUpdate: Date,
  role: String,
  avatar: String,
  active: Boolean,
});

module.exports = mongoose.model("user", userSchema);
