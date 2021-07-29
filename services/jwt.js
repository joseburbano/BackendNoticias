const jwt = require("jwt-simple");
const moment = require("moment");

const SECRE_KEY = "dhjgFd3fggh2hj4u2iut3yuh344SASHJbdsdGfsFsta4fd2h";

exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    names: user.names,
    surnames: user.surnames,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment().add(1, "minute").unix(),
  };

  return jwt.encode(payload, SECRE_KEY);
};

exports.createRefreshToken = function (user) {
  const payload = {
    id: user.id,
    exp: moment().add(1, "hours").unix()
  };

  return jwt.encode(payload, SECRE_KEY);
};

exports.decodedToken = function(token) {
    return jwt.decode(token, SECRE_KEY, true);
}
