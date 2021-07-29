const Caqueta = require("../models/noticiaCaqueta");

/** Obtiene todas las noticias del Caqueta */
exports.getCaqueta = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Caqueta.paginate({}, options, (err, caquetaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!caquetaStored) {
        res
          .status(404)
          .json({
            code: 404,
            message: "No se ha encontrado ninguna noticia del Caqueta.",
          });
      } else {
        res.status(200).json({ code: 200, noticias: caquetaStored });
      }
    }
  });
};

//** Obtiene una sola noticia en especificico por su id*/
exports.getNoticiaCaqueta = (req, res) => {
  const { url } = req.params;

  Caqueta.findOne({ url }, (err, caquetStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!caquetStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: caquetStored });
      }
    }
  });
};

//** Actualizar una sola noticia en especificio por su id */
exports.updateCaqueta = (req, res) => {
  const noticiaCaqueta = req.body;
  const { id } = req.params;

  Caqueta.findByIdAndUpdate(id, noticiaCaqueta, (err, noticiaUpdate) => {
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
exports.deleteCaqueta = (req, res) => {
  const { id } = req.params;

  Caqueta.findByIdAndRemove(id, (err, caquetaDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!caquetaDeleted) {
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
