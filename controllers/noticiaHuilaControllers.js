const Huila = require("../models/noticiaHuila");

/** Obtiene todas las noticias del huila de 10 en 10 por paginate*/
exports.getHuila = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Huila.paginate({}, options, (err, huilaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!huilaStored) {
        res.status(404).json({
          code: 404,
          message: "No se ha encontrado ninguna noticia del Huila.",
        });
      } else {
        res.status(200).json({ code: 200, noticias: huilaStored });
      }
    }
  });
};

/* Obtiene una sola noticia  en especificico por su id*/
exports.getNoticiaHuila = (req, res) => {
  const { url } = req.params;

  Huila.findOne({ url }, (err, huilStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!huilStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: huilStored });
      }
    }
  });
};

//** Actualizar una sola noticia en especificio por su id */
exports.updateHuila = (req, res) => {
  const noticiaHuila = req.body;
  const { id } = req.params;

  Huila.findByIdAndUpdate(id, noticiaHuila, (err, noticiaUpdate) => {
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
exports.deleteHuila = (req, res) => {
  const { id } = req.params;

  Huila.findByIdAndRemove(id, (err, huilaDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!huilaDeleted) {
        res
          .status(404)
          .json({
            code: 404,
            message: "No se a encontrado la noticia que quiere eliminar.",
          });
      } else {
        res
          .status(200)
          .json({
            code: 200,
            message: "Noticia ha sido eliminada correctamente.",
          });
      }
    }
  });
};
