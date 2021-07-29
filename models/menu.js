const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  order: Number,
  active: Boolean,
});
module.exports = mongoose.model("menu", menuSchema);
