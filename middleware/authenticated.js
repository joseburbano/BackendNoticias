const jwt = require("jwt-simple");
const moment = require("moment");

const SECRE_KEY = "dhjgFd3fggh2hj4u2iut3yuh344SASHJbdsdGfsFsta4fd2h";

//funcion para comprovar si tiene cabecera de authenticacion
exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({ message: "La peticion no tiene cabecera de autenticación" });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    var payload = jwt.decode(token, SECRE_KEY);

    if (payload.exp <= moment.unix()) {
      return res.status(404).json({ message: "Su sesión ha expirado." });
    }
  } catch (ex) {
    return res.status(404).json({ message: "Sesión Invalida." });
  }

  req.user = payload;
  next();
};
