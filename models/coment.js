const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const comentNoticiaSchema = new Schema({
  nameUser: {
    type: String,
    trim: true,
  },
  coment: {
    type: String,
    trim: true,
  },
  fechaHora: {
    type: Date,
  },
  active: {
    type: Boolean,
  },
});

module.exports = mongoose.model("comentnoticia", comentNoticiaSchema);
