const Equina = require("../models/noticiaEquina");

/** Obtiene todas las noticias equina */
exports.getEquina = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Equina.paginate({}, options, (err, equinaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!equinaStored) {
        res
          .status(404)
          .json({
            code: 404,
            message: "No se ha encontrado ninguna noticias equinas.",
          });
      } else {
        res.status(200).json({ code: 200, noticias: equinaStored });
      }
    }
  });
};

//** Obtiene una sola noticia  en especificico por su id*/
exports.getNoticiaEquina = (req, res) => {
  const { url } = req.params;

  Equina.findOne({ url }, (err, equinStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!equinStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: equinStored });
      }
    }
  });
};

//** Actualizar una sola noticia en especificio por su id */
exports.updateEquina = (req, res) => {
  const noticiaEquina = req.body;
  const { id } = req.params;

  Equina.findByIdAndUpdate(id, noticiaEquina, (err, noticiaUpdate) => {
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
exports.deleteEquina = (req, res) => {
  const { id } = req.params;

  Equina.findByIdAndRemove(id, (err, equinaDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!equinaDeleted) {
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
