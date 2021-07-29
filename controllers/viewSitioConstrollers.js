const viewSitio = require("../models/viewSitio");

// Cuando se crea una nueva vista de sitio web
exports.nuevaViewSitio = async (req, res, next) => {
  // TODO : Insertar en la base de datos

  try {
    fechaHora = req.body.fechaHora;
    fechaHora = Date.now();
    req.body.fechaHora = fechaHora;
    // crear objeto de noticia con datos de req.body
    const viewsitio = new viewSitio(req.body);
    await viewsitio.save();
    res.json({ mensaje: "Visita se agregó correctamente" });
  } catch (error) {
    console.log(error);
    next();
  }
};
