const Internacional = require("../models/noticiaInternacional");

/** Obtiene todas las noticias del Internacional */
exports.getInternacional = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Internacional.paginate({}, options, (err, internacionalStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!internacionalStored) {
        res
          .status(404)
          .json({
            code: 404,
            message: "No se ha encontrado ninguna noticia Internacional.",
          });
      } else {
        res.status(200).json({ code: 200, noticias: internacionalStored });
      }
    }
  });
};

//** Obtiene una sola noticia  en especificico por su id*/
exports.getNoticiaInternacional = (req, res) => {
  const { url } = req.params;

  Internacional.findOne({ url }, (err, internacionaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!internacionaStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: internacionaStored });
      }
    }
  });
};

//** Actualizar una sola noticia en especificio por su id */
exports.updateInternacional = (req, res) => {
  const noticiaInternacional = req.body;
  const { id } = req.params;

  Internacional.findByIdAndUpdate(
    id,
    noticiaInternacional,
    (err, noticiaUpdate) => {
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
    }
  );
};

//** Eliminar una sola noticia en especifico por su id */
exports.deleteInternacional = (req, res) => {
  const { id } = req.params;

  Internacional.findByIdAndRemove(id, (err, internacionalDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!internacionalDeleted) {
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
