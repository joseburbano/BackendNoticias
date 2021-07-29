//requerimos de los modelos
const huila = require("../models/noticiaHuila");
const agricola = require("../models/noticiaAgricola");
const caqueta = require("../models/noticiaCaqueta");
const equina = require("../models/noticiaEquina");
const internacional = require("../models/noticiaInternacional");
const putumayo = require("../models/noticiaPutumayo");
const tendencia = require("../models/noticiaTendencia");
const tolima = require("../models/noticiaTolima");
const nacional = require("../models/noticiaNacional");
//slug para y shor id generar url
const slug = require("slug");
const shortid = require("shortid");
const { compareSync } = require("bcrypt");
const { count } = require("../models/noticiaHuila");

//Cuando se crea una nueva noticia
exports.addNoticias = (req, res) => {
  //TODO : Insertar en la base de datos
  const body = req.body;
  tituloPrincipal = body.tituloPrincipal;
  Url = tituloPrincipal;
  const url = slug(Url).toLowerCase();
  body.url = `${url}-${shortid.generate()}`;
  active = body.active;
  active = true;
  body.active = active;
  const donde = body.options;
  var optionss = body.options;

  if (optionss == "Huila") {
    optionss = huila;
  } else {
    if (optionss == "Caqueta") {
      optionss = caqueta;
    } else {
      if (optionss == "Putumayo") {
        optionss = putumayo;
      } else {
        if (optionss == "Tolima") {
          optionss = tolima;
        } else {
          if (optionss == "Tendencia") {
            optionss = tendencia;
          } else {
            if (optionss == "Internacional") {
              optionss = internacional;
            } else {
              if (optionss == "Nacional") {
                optionss = nacional;
              } else if (optionss == "Agricola") {
                optionss = agricola;
              } else if (optionss == "Equina") {
                optionss = equina;
              } else {
                res.status(404).json({
                  code: 404,
                  message:
                    "Error en el envio de datos, debes enviar los datos correctos.",
                  usuario: "Comunicarse con el administrador del sitio.",
                });
              }
            }
          }
        }
      }
    }
  }

  const noticias = new options(body);
  noticias.save((err, noticiaStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!noticiaStored) {
        res.status(400).json({
          code: 400,
          message: `No se ha podido crear la noticias en ${donde}.`,
        });
      } else {
        res.status(200).json({
          code: 200,
          message: `La Noticia ${donde} se agregó correctamente.`,
        });
      }
    }
  });
};

/** Obtiene todas las noticias del inicio de 10 en 10 por paginate*/
exports.inicioNoticias = (req, res) => {
  const noticiasDatos = [];

  const { page = 1, limit = 1 } = req.query;
  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "asc" },
  };
  var recorrido = [
    equina,
    huila,
    caqueta,
    putumayo,
    tolima,
    agricola,
    nacional,
    internacional,
  ];

  recorrido.map(function (recorrido) {
    //funcion flecha consulta base datos
    recorrido.paginate({}, options, (err, storedP) => {
      if (err) {
        res.status(500).json({ code: 500, message: "Error del servidor." });
      } else {
        if (!storedP) {
          res.status(404).json({
            code: 404,
            message: "No se ha encontrado ninguna noticia.",
          });
        } else {
          cargarUno(storedP);
        }
      }
    });
  });

  function cargarUno(storedP) {
    return noticiasDatos.push(storedP);
  }

  res.status(200).json({ code: 200, noticias: "Hola" });
};
