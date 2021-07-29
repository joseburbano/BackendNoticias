const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewSitioSchema = new Schema({
  fechaHora: {
    type: Date,
  },
  ip: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("viewsitio", viewSitioSchema);
