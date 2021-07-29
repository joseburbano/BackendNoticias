const viewNoticia = require("../models/viewNoticia");

// Cuando se crea una nueva vista de noticia
exports.nuevaViewNoticia = async (req, res, next) => {
  // TODO : Insertar en la base de datos

  try {
    fechaHora = req.body.fechaHora;
    fechaHora = Date.now();
    req.body.fechaHora = fechaHora;
    // crear objeto de noticia con datos de req.body
    const viewnoticia = new viewNoticia(req.body);
    await viewnoticia.save();
    res.json({ mensaje: "Visita se agregó correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};
