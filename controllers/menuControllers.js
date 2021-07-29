const Menu = require("../models/menu");

//Cuando se crea un nuevo menu
exports.addMenu = (req, res) => {
  //TODO : Insertar en la base de datos

  const { title, url, order, active } = req.body;
  const menu = new Menu();
  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;

  menu.save((err, createdMenu) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!createdMenu) {
        res.status(404).json({ message: "Error al crear el menu" });
      } else {
        res.status(200).json({ message: "Menu creado correctamente" });
      }
    }
  });
};

/** Obtiene todos los menus */

exports.getMenus = (req, res, next) => {
  Menu.find()
    .sort({ order: "asc" })
    .exec((err, menusStored) => {
      if (err) {
        res.status(500).json({ message: "Error del servidor." });
      } else {
        if (!menusStored) {
          res.status(404).json({
            message: "No se ha encontrado ningun elemento en el menu.",
          });
        } else {
          res.status(200).json({ menu: menusStored });
        }
      }
    });
};

//** Actualizar un solo menu en especificio por su id */

exports.updateMenu = (req, res) => {
  let menuData = req.body;
  const params = req.params;

  Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!menuUpdate) {
        res.status(404).json({ message: "No se encontrado ningun menu." });
      } else {
        res.status(200).json({ message: "Menu actualizado correctamente" });
      }
    }
  });
};

exports.activateMenu = (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  Menu.findByIdAndUpdate(id, { active }, (err, menuStored) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!menuStored) {
        res.status(404).json({ message: "No se ha encontrado el menu." });
      } else {
        if (active === true) {
          res.status(200).json({ message: "Menu activado correctamente." });
        } else {
          res.status(200).json({ message: "Menu desactivado correctamente." });
        }
      }
    }
  });
};

//** Eliminar un menu en especifico por su id */

exports.deleteMenu = (req, res) => {
  const { id } = req.params;
  Menu.findByIdAndRemove(id, (err, menuDeleted) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!menuDeleted) {
        res.status(404).json({ message: "Menú no encontrado." });
      } else {
        res.status(200).json({ message: "Menú ha sido eliminado correctamente." });
      }
    }
  });
};
