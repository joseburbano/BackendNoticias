//librerias
const express = require("express");
const router = express.Router();
//importamos mildeware de autenticacion
const md_auth = require("../middleware/authenticated");
//mildware para importar archivos que quiere cargar el usuario como fotos y archivos
const multipart = require("connect-multiparty");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });

/// importantdo controlladores
const noticiaHuilaController = require("../controllers/noticiaHuilaControllers");
const noticiaCaquetaController = require("../controllers/noticiaCaquetaControllers");
const noticiaPutumayoController = require("../controllers/noticiaPutumayoControllers");
const noticiaTolimaController = require("../controllers/noticiaTolimaControllers");
const noticiaTendenciaController = require("../controllers/noticiaTendenciaControllers");
const noticiaAgricolaController = require("../controllers/noticiaAgricolaControllers");
const noticiaInternacionalController = require("../controllers/noticiaInternacionalControllers");
const noticiaNacionalController = require("../controllers/noticiaNacionalControllers");
const noticiaEquinaController = require("../controllers/noticiaEquinaControllers");
const comentControllers = require("../controllers/comentControllers");
const menuControllers = require("../controllers/menuControllers");
const subMenuControllers = require("../controllers/subMenuControllers");
const userControllers = require("../controllers/userControllers");
const viewNoticiaControllers = require("../controllers/viewNoticiaControllers");
const viewSitioControllers = require("../controllers/viewSitioConstrollers");
const authControllers = require("../controllers/authControllers");
const nesletterControllers = require("../controllers/newsletterControllers");
const noticiasControllers = require("../controllers/noticiasControllers");

module.exports = function () {
  // auth token xpired de backend
  router.post("/refresh-access-token", authControllers.refreshAccessToken);

  //AGREGAR NOTICIAS EN CUALQUIERA DE LOS MODELOS DE LA SECCION DE NOTICIAS
  router.post(
    "/add-noticias",
    [md_auth.ensureAuth],
    noticiasControllers.addNoticias
  );
  //VER NOTICIAS EN CUALQUIERA DE LOS MODELOS DE LA SECCION DE NOTICIAS PAGINA INICIO
  router.get(
    "/inicio-noticias",
    noticiasControllers.inicioNoticias
  );

  //HUILA
  // Obtiene todos los registros de las noticias del huila  via GET en la BD
  router.get("/get-todos-huila", noticiaHuilaController.getHuila);
  // Obtiene una Noticia del huila en especifico (ID) via GET
  router.get("/get-huila/:url", noticiaHuilaController.getNoticiaHuila);
  // Actualizar una noticia del huila en la BD via PUT
  router.put(
    "/update-huila/:id",
    [md_auth.ensureAuth],
    noticiaHuilaController.updateHuila
  );
  // Eliminar una sola noticia del huila en la BD via delete
  router.delete(
    "/delete-huila/:id",
    [md_auth.ensureAuth],
    noticiaHuilaController.deleteHuila
  );

  // CAQUETA
  // Obtiene todos los registros de las noticias del Caqueta  via GET en la BD
  router.get("/get-todos-caqueta", noticiaCaquetaController.getCaqueta);
  // Obtiene una Noticia del Caqueta en especifico (ID) via GET
  router.get("/get-caqueta/:url", noticiaCaquetaController.getNoticiaCaqueta);
  // Actualizar una noticia del Caqueta en la BD via PUT
  router.put(
    "/update-caqueta/:id",
    [md_auth.ensureAuth],
    noticiaCaquetaController.updateCaqueta
  );
  // Eliminar una sola noticia del Caqueta en la BD via delete
  router.delete(
    "/delete-caqueta/:id",
    [md_auth.ensureAuth],
    noticiaCaquetaController.deleteCaqueta
  );

  // // TOLIMA
  // Obtiene todos los registros de las noticias del Tolima  via GET en la BD
  router.get("/get-todos-tolima", noticiaTolimaController.getTolima);
  // Obtiene una Noticia del Tolima en especifico (ID) via GET
  router.get("/get-tolima/:url", noticiaTolimaController.getNoticiaTolima);
  // Actualizar una noticia del Tolima en la BD via PUT
  router.put(
    "/update-tolima/:id",
    [md_auth.ensureAuth],
    noticiaTolimaController.updateTolima
  );
  // Eliminar una sola noticia del Tolima en la BD via delete
  router.delete(
    "/delete-tolima/:id",
    [md_auth.ensureAuth],
    noticiaTolimaController.deleteTolima
  );

  // PUTUMAYO
  // Obtiene todos los registros de las noticias del Putumayo  via GET en la BD
  router.get("/get-todos-putumayo", noticiaPutumayoController.getPutumayo);
  // // Obtiene una Noticia del Putumayo en especifico (ID) via GET
  router.get(
    "/get-putumayo/:url",
    noticiaPutumayoController.getNoticiaPutumayo
  );
  // Actualizar una noticia del Putumayo en la BD via PUT
  router.put(
    "/update-putumayo/:id",
    [md_auth.ensureAuth],
    noticiaPutumayoController.updatePutumayo
  );
  // Eliminar una sola noticia del Putumayo en la BD via delete
  router.delete(
    "/delete-putumayo/:id",
    [md_auth.ensureAuth],
    noticiaPutumayoController.deletePutumayo
  );

  // EQUINOS
  // Obtiene todos los registros de las noticias Equinas via GET en la BD
  router.get("/get-todos-equina", noticiaEquinaController.getEquina);
  // Obtiene una Noticia Equina en especifico (ID) via GET
  router.get("/get-equina/:url", noticiaEquinaController.getNoticiaEquina);
  // Actualizar una noticia del Equina en la BD via PUT
  router.put(
    "/update-equina/:id",
    [md_auth.ensureAuth],
    noticiaEquinaController.updateEquina
  );
  // Eliminar una sola noticia Equina en la BD via delete
  router.delete(
    "/delete-equina/:id",
    [md_auth.ensureAuth],
    noticiaEquinaController.deleteEquina
  );

  // AGRICOLA
  // Obtiene todos los registros de las noticias Agricolas  via GET en la BD
  router.get("/get-todos-agricola", noticiaAgricolaController.getAgricola);
  // Obtiene una Noticia Agricola en especifico (ID) via GET
  router.get(
    "/get-agricola/:url",
    noticiaAgricolaController.getNoticiaAgricola
  );
  //Actualizar una noticia del Agricola en la BD via PUT
  router.put(
    "/update-agricola/:id",
    [md_auth.ensureAuth],
    noticiaAgricolaController.updateAgricola
  );
  // Eliminar una sola noticia Agricola en la BD via delete
  router.delete(
    "/delete-agricola/:id",
    [md_auth.ensureAuth],
    noticiaAgricolaController.deleteAgricola
  );

  //TENDENCIAS
  // Obtiene todos los registros de las noticias de Tendencia via GET en la BD
  router.get("/get-todos-tendencia", noticiaTendenciaController.getTendencia);
  // Obtiene una Noticia de Tendencia en especifico (ID) via GET
  router.get(
    "/get-tendencia/:url",
    noticiaTendenciaController.getNoticiaTendencia
  );
  // Actualizar una noticia del Tendencia en la BD via PUT
  router.put(
    "/update-tendencia/:id",
    [md_auth.ensureAuth],
    noticiaTendenciaController.updateTendencia
  );
  // Eliminar una sola noticia del Tendencia en la BD via delete
  router.delete(
    "/delete-tendencia/:id",
    [md_auth.ensureAuth],
    noticiaTendenciaController.deleteTendencia
  );

  // INTERNACIONAL
  // Obtiene todos los registros de las noticias Internacional  via GET en la BD
  router.get(
    "/get-todos-internacional",
    noticiaInternacionalController.getInternacional
  );
  // Obtiene una Noticia Internacional en especifico (ID) via GET
  router.get(
    "/get-internacional/:url",
    noticiaInternacionalController.getNoticiaInternacional
  );
  // Actualizar una noticia Internacional en la BD via PUT
  router.put(
    "/update-internacional/:id",
    [md_auth.ensureAuth],
    noticiaInternacionalController.updateInternacional
  );
  // Eliminar una sola noticia Internacional en la BD via delete
  router.delete(
    "/delete-internacional/:id",
    [md_auth.ensureAuth],
    noticiaInternacionalController.deleteInternacional
  );

  // NACIONAL
  // Obtiene todos los registros de las noticias Nacional  via GET en la BD
  router.get("/get-todos-nacional", noticiaNacionalController.getNacional);
  // Obtiene una Noticia nacional en especifico (ID) via GET
  router.get(
    "/get-nacional/:url",
    noticiaNacionalController.getNoticiaNacional
  );
  // Actualizar una noticia Nacional en la BD via PUT
  router.put(
    "/update-nacional/:id",
    [md_auth.ensureAuth],
    noticiaNacionalController.updateNacional
  );
  // Eliminar una sola noticia nacional en la BD via delete
  router.delete(
    "/delete-nacional/:id",
    [md_auth.ensureAuth],
    noticiaNacionalController.deleteNacional
  );

  // COMENT
  // Agregar comentarios
  router.post("/coment", comentControllers.nuevoComent);
  // Obtener todos los comentarios
  router.get("/coment", comentControllers.obtenerComents);
  // Obtener un solo comentario
  router.get("/coment/:id", comentControllers.obtenerComent);
  // Actualizar o editar comentario
  router.put("/coment/:id", comentControllers.updateComent);
  // Eliminar un comentario
  router.delete("/coment/:id", comentControllers.deleteComent);

  // MENU
  // Agregar menu nuevo
  router.post("/add-menu", [md_auth.ensureAuth], menuControllers.addMenu);
  // Obtener Todo el menu
  router.get("/get-menus", menuControllers.getMenus);
  // Actualizar un menu
  router.put(
    "/update-menu/:id",
    [md_auth.ensureAuth],
    menuControllers.updateMenu
  );
  //activar menus
  router.put(
    "/activate-menu/:id",
    [md_auth.ensureAuth],
    menuControllers.activateMenu
  );
  // Eliminar un menu
  router.delete(
    "/delete-menu/:id",
    [md_auth.ensureAuth],
    menuControllers.deleteMenu
  );

  // SUBMENUS
  // Agregar submenu nuevo
  router.post(
    "/add-sub-menu",
    [md_auth.ensureAuth],
    subMenuControllers.addSubMenu
  );
  // Obtener Todo el submenu
  router.get("/get-sub-menus", subMenuControllers.getSubMenus);
  // Actualizar un submenu
  router.put(
    "/update-sub-menu/:id",
    [md_auth.ensureAuth],
    subMenuControllers.updateSubMenu
  );
  //activar submenus
  router.put(
    "/activate-sub-menu/:id",
    [md_auth.ensureAuth],
    subMenuControllers.activateSubMenu
  );
  // Eliminar un submenu
  router.delete(
    "/delete-sub-menu/:id",
    [md_auth.ensureAuth],
    subMenuControllers.deleteSubMenu
  );

  //NEWSLETTER
  router.post(
    "/suscribe-newsletter/:email",
    nesletterControllers.suscribeEmail
  );

  // USUARIOS

  // Agregar usuario nuevo sin loguearse yo le puse seguridad por si mas adelante lo requiero pero
  //esta imnabilitado
  router.post("/sign-up", userControllers.signUp);
  // Obtener Todos los usuarios
  router.get("/get-users", [md_auth.ensureAuth], userControllers.getUsers);
  // Obtener un solo usuario
  router.post("/sign-in", userControllers.signIn);
  // Mostrar usuarios activos podemos pedir el parametro inactivo tambien
  router.get(
    "/users-active",
    [md_auth.ensureAuth],
    userControllers.getUsersActive
  );
  // Actualizar un usuario el avatar dos mildeware uno de autenticacion y el de fichero
  router.put(
    "/upload-avatar/:id",
    [md_auth.ensureAuth, md_upload_avatar],
    userControllers.uploadAvatar
  );
  //aca obtenemos el avatar la imagen para enviar a fron
  router.get("/get-avatar/:avatarName", userControllers.getAvatar);

  //actualizar usuario
  router.put(
    "/update-user/:id",
    [md_auth.ensureAuth],
    userControllers.updateUser
  );

  //Activar usuarios
  router.put(
    "/activate-user/:id",
    [md_auth.ensureAuth],
    userControllers.activateUser
  );

  // Eliminar un usuario
  router.delete(
    "/delete-user/:id",
    [md_auth.ensureAuth],
    userControllers.deleteUser
  );
  //agregar usuarios desde admin
  router.post(
    "/sign-up-admin",
    [md_auth.ensureAuth],
    userControllers.signUpAdmin
  );

  // NOTICIA VISTA

  // Agregar una visita
  router.post("/viewNoticia/:id", viewNoticiaControllers.nuevaViewNoticia);

  // VISITAS EN EL SITIO

  // Agregar una visita
  router.post("/viewSitio", viewSitioControllers.nuevaViewSitio);

  return router;
};
