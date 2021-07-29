const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const noticiasInternacionalSchema = new Schema({
   //definicmos la estructura de la tabla o docuemnto de la collection
  tituloPrincipal: {
    type: String,
    trim: true,
    unique: true,
  },
  description: String,
  fechaHora: Date,
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
  options: String,
  active: Boolean,
});
noticiasInternacionalSchema.plugin(mongoosePaginate);
module.exports = mongoose.model(
  "notiinternacional",
  noticiasInternacionalSchema
);
