const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");

exports.willExpireToken = (token) => {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
};

exports.refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  const isTokenExpired = this.willExpireToken(refreshToken);

  if (isTokenExpired) {
    res.status(404).json({ message: "La sesión ha expirado" });
  } else {
    const { id } = jwt.decodedToken(refreshToken);
    User.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).json({ message: "Error del servidor." });
      } else {
        if (!userStored) {
          res.status(404).json({ message: "Usuario no encontrado." });
        } else {
          res.status(200).json({
            accessToken: jwt.createRefreshToken(userStored),
            refreshToken: refreshToken,
          });
        }
      }
    });
  }
};
