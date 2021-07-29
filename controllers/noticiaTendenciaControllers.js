const Tendencia = require("../models/noticiaTendencia");

/** Obtiene todas las noticias de Tendencias */
exports.getTendencia = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Tendencia.paginate({}, options, (err, tendenciaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!tendenciaStored) {
        res
          .status(404)
          .json({
            code: 404,
            message: "No se ha encontrado ninguna noticia del tendencia.",
          });
      } else {
        res.status(200).json({ code: 200, noticias: tendenciaStored });
      }
    }
  });
};

//** Obtiene una sola noticia  en especificico por su id*/
exports.getNoticiaTendencia = (req, res) => {
  const { url } = req.params;

  Tendencia.findOne({ url }, (err, tendenciStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!tendenciStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: tendenciStored });
      }
    }
  });
};

//** Actualizar una sola noticia en especificio por su id */
exports.updateTendencia = (req, res) => {
  const noticiaTendencia = req.body;
  const { id } = req.params;

  Tendencia.findByIdAndUpdate(id, noticiaTendencia, (err, noticiaUpdate) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor" });
    } else {
      if (!noticiaUpdate) {
        res.status(404).json({
          code: 404,
          message: "No se ha encontrado ninguna noticia.",
        });
      } else {
        res
          .status(200)
          .json({ code: 200, message: "Noticia actualizada correctamente." });
      }
    }
  });
};

//** Eliminar una sola noticia en especifico por su id */
exports.deleteTendencia = (req, res) => {
  const { id } = req.params;

  Tendencia.findByIdAndRemove(id, (err, tendenciaDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!tendenciaDeleted) {
        res
          .status(404)
          .json({ code: 404, message: "No se a encontrado la noticia que quiere eliminar." });
      } else {
        res
          .status(200)
          .json({ code: 200, message: "Noticia ha sido eliminada correctamente." });
      }
    }
  });
};
