const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const noticiasHuilaSchema = new Schema({
  //definicmos la estructura de la tabla o docuemnto de la collection
  tituloPrincipal: {
    type: String,
    trim: true,
    unique: true,
  },
  description: String,
  fotografia: String,
  autor: String,
  contenidoOne: {
    type: String,
    trim: true,
  },
  imagenOne: String,
  contenidoTwo: {
    type: String,
    trim: true,
  },
  imagenTwo: String,
  contenidoThree: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    unique: true,
  },
  importancia: Number,
  contadorVisitas: Number,
  fecha: Date,
  options: String,
  active: Boolean,
});

noticiasHuilaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notihuila", noticiasHuilaSchema);
