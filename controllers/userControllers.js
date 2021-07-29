const bcrypt = require("bcrypt-nodejs");
const moment = require("moment");
const User = require("../models/user");
const jwt = require("../services/jwt");
const fs = require("fs");
const path = require("path");

//Cuando se crea un nuevo usuario sin loguearse
exports.signUp = (req, res) => {
  const user = new User(req.body);
  password = user.password;
  repeatPassword = req.body.repeatPassword;

  if (!password || !repeatPassword) {
    res.status(404).json({ message: "las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).json({ message: "las contraseñas no son iguales" });
    } else {
      bcrypt.hash(password, null, null, function (err, hast) {
        if (err) {
          res.status(500).json({ message: "error al encriptar la contraseña" });
        } else {
          user.password = hast;
          emails = user.email;
          user.email = emails.toLowerCase();
          user.active = true;
          fechaCreate = user.fechaCreate;
          user.fechaCreate = moment(fechaCreate);
          userUpdate = user.userUpdate;
          user.userUpdate = moment(userUpdate);
          fechaUpdate = user.fechaUpdate;
          user.fechaUpdate = moment(fechaUpdate);
          user.save((err, userStored) => {
            if (err) {
              res.status(500).json({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res.status(404).json({ message: "Error al crear Usuario." });
              } else {
                res.status(200).json({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
};

/** Obtiene datos del usuario actual*/

exports.getUsers = (req, res) => {
  User.find().then((users) => {
    if (!users) {
      res.status(404).json({ message: "No se a encontrado ningun usuario." });
    } else {
      res.status(200).json({ users });
    }
  });
};


/** Obtiene todos los usuarios*/

exports.getUsers = (req, res) => {
  User.find().then((users) => {
    if (!users) {
      res.status(404).json({ message: "No se a encontrado ningun usuario." });
    } else {
      res.status(200).json({ users });
    }
  });
};

//** Obtiene una usuario en especificico por su id para el inicio de sesion por mediod e stoken*/

exports.signIn = (req, res) => {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).json({ message: "Error del Servidor." });
    } else {
      if (!userStored) {
        res.status(404).json({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).json({ message: "Error del servidor." });
          } else if (!check) {
            res.status(404).json({ message: "La contraseña es incorrecta" });
          } else {
            if (!userStored.active) {
              res.status(200).json({
                code: 200,
                message: "El usuario no se ha esta activado.",
              });
            } else {
              res.status(200).json({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
};

/** Obtiene todos los usuarios activos*/

exports.getUsersActive = (req, res) => {
  //le pasamos el parametro que pide
  const query = req.query;

  User.find({ active: query.active }).then((users) => {
    if (!users) {
      res.status(404).json({ message: "No se a encontrado ningun usuario." });
    } else {
      res.status(200).json({ users });
    }
  });
};

//** funcion para subir el avatar o imagen al servidor*/

exports.uploadAvatar = (req, res) => {
  const params = req.params;

  //con la id que envie el front  buscamos el id en la bd
  //comprobamos que el
  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!userData) {
        res
          .status(404)
          .json({ message: "No se ha encontrado ningun usuario." });
      } else {
        //aca es donde el usuario es encontrado y si lo es
        let user = userData;
        //aca es donde recuperamos la imagen selecciona
        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("/");
          let fileName = fileSplit[2];

          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];
          //aca comprovamos que se suba con las extenciones de imagen correctas
          if (fileExt !== "png" && fileExt !== "jpg" && fileExt !== "jpeg") {
            res.status(400).json({
              message:
                "La extension de la imagen no es valida. (Extensiones permitidas: .jpg .jpeg .png",
            });
            //aca almacenamo el nombre de la imagen y su ubicacion donde quedara almacenada
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).json({ message: "Error del servidor." });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .json({ message: "No se a encontrado ningun usuario" });
                  } else {
                    res.status(200).json({ avatarName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
};

//funcion para recuperar nuestro avatar de backend y envia el backen a frond encia imagen al usuario
exports.getAvatar = (req, res) => {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).json({ message: "El avatar que buscas no existe." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

//funcion para actualizar los datos del usuario
exports.updateUser = async (req, res) => {
  let userData = req.body;
  //eliminarme las mayusculas de las el correo
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).json({ message: "Error al encriptar la contraseña." });
      } else {
        userData.password = hash;
      }
    });
  }

  //guarada la actualizacion
  User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!userUpdate) {
        res
          .status(404)
          .json({ message: "No se ha encontrado ningun usuario." });
      } else {
        res.status(200).json({ message: "Usuario Actualizado Correctamente." });
      }
    }
  });
};

//funcion para activar y desactivar usuarios
exports.activateUser = (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  User.findByIdAndUpdate(id, { active }, (err, userStored) => {
    if (err) {
      res.status(500).json({ message: "Error del Servidor." });
    } else {
      if (!userStored) {
        res.status(404).json({ message: "No se ha encontrado el usuario." });
      } else {
        if (active === true) {
          res.status(200).json({ message: "Usuario activado correctamente." });
        } else {
          res
            .status(200)
            .json({ message: "Usuario desactivado correctamente." });
        }
      }
    }
  });
};

//** Eliminar un usuario en especifico por su id */

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!userDeleted) {
        res.status(404).json({ message: "Usuario no encontrado." });
      } else {
        res
          .status(200)
          .json({ message: "El usuario ha sido eliminado correctamente." });
      }
    }
  });
};

//funcion agregar usuario desde administrador
exports.signUpAdmin = (req, res) => {
  const user = new User();

  const {
    names,
    surnames,
    address,
    phone,
    email,
    password,
    role,
  } = req.body;
  user.names = names;
  user.surnames = surnames;
  user.address = address;
  user.phone = phone;
  user.email = email.toLowerCase();
  user.role = role;
  user.active = true;

  if (!password) {
    res.status(500).json({ message: "La contraseña es obligatoria" });
  } else {
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        res.status(500).json({ message: "Error al encriptar la contraseña." });
      } else {
        user.password = hash;

        user.fechaCreate = moment(fechaCreate);
        user.userUpdate = moment(userUpdate);
        user.fechaUpdate = moment(fechaUpdate);

        user.save((err, userStored) => {
          if (err) {
            res.status(500).json({ message: "El usuario ya existe." });
          } else {
            if (!userStored) {
              res.status(500).json({ message: "Error al crear el usuario." });
            } else {
              //res.status(200).json({ user: userStored }); aca devolvemos los datos del usuario
              res.status(200)
                .json({ message: "Usuario creado correctamente." });
            }
          }
        });
      }
    });
  }
};
