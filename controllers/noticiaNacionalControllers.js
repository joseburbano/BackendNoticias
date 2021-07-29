const Nacional = require("../models/noticiaNacional");

/** Obtiene todas las noticias Nacionals */
exports.getNacional = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Nacional.paginate({}, options, (err, nacionalStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!nacionalStored) {
        res.status(404).json({
          code: 404,
          message: "No se ha encontrado ninguna noticias Nacionales.",
        });
      } else {
        res.status(200).json({ code: 200, noticias: nacionalStored });
      }
    }
  });
};

//** Obtiene una sola noticia  en especificico por su id*/
exports.getNoticiaNacional = (req, res) => {
  const { url } = req.params;

  Nacional.findOne({ url }, (err, nacionaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!nacionaStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: nacionaStored });
      }
    }
  });
};

//** Actualizar una sola noticia en especificio por su id */
exports.updateNacional = (req, res) => {
  const noticiaNacional = req.body;
  const { id } = req.params;

  Nacional.findByIdAndUpdate(id, noticiaNacional, (err, noticiaUpdate) => {
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
exports.deleteNacional = (req, res) => {
  const { id } = req.params;

  Nacional.findByIdAndRemove(id, (err, nacionalDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!nacionalDeleted) {
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
