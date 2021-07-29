const Tolima = require("../models/noticiaTolima");

/** Obtiene todas las noticias del tolima de 10 en 10 por paginate*/
exports.getTolima = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Tolima.paginate({}, options, (err, tolimaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!tolimaStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia del tolima." });
      } else {
        res.status(200).json({ code: 200, noticias: tolimaStored })
      }
    }
  });
};

//** Obtiene una sola noticia  en especificico por su id*/
exports.getNoticiaTolima = (req, res) => {
  const { url } = req.params;

  Tolima.findOne({ url }, (err, tolimStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!tolimStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: tolimStored });
      }
    }
  });
};

//** Actualizar una sola noticia en especificio por su id */
exports.updateTolima = (req, res) => {
  const noticiaTolima = req.body;
  const { id } = req.params;

  Tolima.findByIdAndUpdate(id, noticiaTolima, (err, noticiaUpdate) => {
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
exports.deleteTolima = (req, res) => {
  const { id } = req.params;

  Tolima.findByIdAndRemove(id, (err, tolimaDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!tolimaDeleted) {
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
