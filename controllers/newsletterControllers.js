const Newsletter = require("../models/newsletter");

//funcion para guardar email el el de suscripcion
exports.suscribeEmail = (req, res) => {
  const email = req.params.email;
  const newsletter = new Newsletter();
  newsletter.active = true;

  if (!email) {
    res.status(404).json({ code: 404, message: "El email es obligatio." });
  } else {
    newsletter.email = email.toLowerCase();

    newsletter.save((err, newsletterStore) => {
      if (err) {
        res.status(500).json({ code: 500, message: "El email ya existe." });
      } else {
        if (!newsletterStore) {
          res.status(404)
            .json({
              code: 404,
              message: "Error al registrar en la newsletter.",
            });
        } else {
          res.status(200)
            .json({ code: 200, message: "Email suscrito correctamente." });
        }
      }
    });
  }
};
