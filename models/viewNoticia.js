const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewNoticiaSchema = new Schema({
  fechaHora: {
    type: Date,
  },
  ip: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("viewnoticia", viewNoticiaSchema);
