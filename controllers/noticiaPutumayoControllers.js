const Putumayo = require("../models/noticiaPutumayo");

/** Obtiene todas las noticias del Putumayo*/
exports.getPutumayo = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Putumayo.paginate({}, options, (err, putumayoStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!putumayoStored) {
        res
          .status(404)
          .json({
            code: 404,
            message: "No se ha encontrado ninguna noticia del putumayo.",
          });
      } else {
        res.status(200).json({ code: 200, noticias: putumayoStored });
      }
    }
  });
};

//** Obtiene una sola noticia  en especificico por su id*/

exports.getNoticiaPutumayo = (req, res) => {
  const { url } = req.params;

  Putumayo.findOne({ url }, (err, putumayStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!putumayStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: putumayStored });
      }
    }
  });
};

//** Actualizar una sola noticia en especificio por su id */
exports.updatePutumayo = (req, res) => {
  const noticiaPutumayo = req.body;
  const { id } = req.params;

  Putumayo.findByIdAndUpdate(id, noticiaPutumayo, (err, noticiaUpdate) => {
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
exports.deletePutumayo = (req, res) => {
  const { id } = req.params;

  Putumayo.findByIdAndRemove(id, (err, putumayoDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!putumayoDeleted) {
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
