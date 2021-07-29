const Agricola = require("../models/noticiaAgricola");

/** Obtiene todas las noticias Agricolas */
exports.getAgricola = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Agricola.paginate({}, options, (err, agricolaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!agricolaStored) {
        res.status(404).json({
          code: 404,
          message: "No se ha encontrado ninguna noticias Agricolas.",
        });
      } else {
        res.status(200).json({ code: 200, noticias: agricolaStored });
      }
    }
  });
};

//** Obtiene una sola noticia  en especificico por su id*/
exports.getNoticiaAgricola = (req, res) => {
  const { url } = req.params;

  Agricola.findOne({ url }, (err, agricolStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!agricolStored) {
        res
          .status(404)
          .json({ code: 404, message: "No se ha encontrado ninguna noticia." });
      } else {
        res.status(200).json({ code: 200, noticia: agricolStored });
      }
    }
  });
};

 //** Actualizar una sola noticia en especificio por su id */
exports.updateAgricola = (req, res) => {
  const noticiaAgricola = req.body;
  const { id } = req.params;

  Agricola.findByIdAndUpdate(id, noticiaAgricola, (err, noticiaUpdate) => {
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
exports.deleteAgricola = (req, res) => {
  const { id } = req.params;

  Agricola.findByIdAndRemove(id, (err, agricolaDeleted) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!agricolaDeleted) {
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
