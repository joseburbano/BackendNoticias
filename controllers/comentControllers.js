const Coment = require("../models/coment");

//Cuando se crea una nuevo comentario
exports.nuevoComent = async (req, res, next) => {
  //TODO : Insertar en la base de datos

  try {
    active = req.body.active;
    active = true;
    req.body.active = active;
    fechaHora = req.body.fechaHora;
    fechaHora = Date.now();
    req.body.fechaHora = fechaHora;
    //crear objeto de comentarios con datos de req.body
    const coment = new Coment(req.body);
    await coment.save();
    res.json({ mensaje: "El comentario se agregó correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};

/** Obtiene todos los comentarios */

exports.obtenerComents = async (req, res, next) => {
  try {
    const coment = await Coment.find({});
    res.json(coment);
  } catch (error) {
    console.log(error);
    next();
  }
};

//** Obtiene un solo comentario en especificico por su id*/

exports.obtenerComent = async (req, res, next) => {
  try {
    const coment = await Coment.findById(req.params.id);
    res.json(coment);
  } catch (error) {
    console.log(error);
    next();
  }
};

//** Actualizar un sola comentario en especificio por su id */

exports.updateComent = async (req, res, next) => {
  try {
    const coment = await Coment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(coment);
  } catch (error) {
    console.log(error);
    next();
  }
};

//** Eliminar una sola noticia en especifico por su id */

exports.deleteComent = async (req, res, next) => {
  try {
    await Coment.findOneAndDelete({ _id: req.params.id });
    res.json({ mensaje: "El comentario fue eliminada!" });
  } catch (error) {
    console.log(error);
    next();
  }
};
