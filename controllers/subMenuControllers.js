const SubMenu = require("../models/submenu");

//Cuando se crea un nuevo submenu
exports.addSubMenu = (req, res) => {
  //TODO : Insertar en la base de datos

  const { title, url, order, active } = req.body;
  const submenu = new SubMenu();
  submenu.title = title;
  submenu.url = url;
  submenu.order = order;
  submenu.active = active;

  submenu.save((err, createdSubMenu) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!createdSubMenu) {
        res.status(404).json({ message: "Error al crear el submenu" });
      } else {
        res.status(200).json({ message: "SubMenu creado correctamente" });
      }
    }
  });
};

/** Obtiene todos los submenus */

exports.getSubMenus = (req, res) => {
  SubMenu.find()
    .sort({ order: "asc" })
    .exec((err, subMenusStored) => {
      if (err) {
        res.status(500).json({ message: "Error del servidor." });
      } else {
        if (!subMenusStored) {
          res.status(404).json({
            message: "No se ha encontrado ningun elemento en el submenu.",
          });
        } else {
          res.status(200).json({ submenu: subMenusStored });
        }
      }
    });
};

//** Actualizar un solo submenu en especificio por su id */

exports.updateSubMenu = (req, res) => {
  let subMenuData = req.body;
  const params = req.params;

  SubMenu.findByIdAndUpdate(params.id, subMenuData, (err, subMenuUpdate) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!subMenuUpdate) {
        res.status(404).json({ message: "No se encontrado ningun submenu." });
      } else {
        res.status(200).json({ message: "SubMenu actualizado correctamente" });
      }
    }
  });
};

exports.activateSubMenu = (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  SubMenu.findByIdAndUpdate(id, { active }, (err, subMenuStored) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!subMenuStored) {
        res.status(404).json({ message: "No se ha encontrado el submenu." });
      } else {
        if (active === true) {
          res.status(200).json({ message: "SubMenu activado correctamente." });
        } else {
          res.status(200).json({ message: "SubMenu desactivado correctamente." });
        }
      }
    }
  });
};

//** Eliminar un submenu en especifico por su id */

exports.deleteSubMenu = (req, res) => {
  const { id } = req.params;
  SubMenu.findByIdAndRemove(id, (err, subMenuDeleted) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!subMenuDeleted) {
        res.status(404).json({ message: "Menú no encontrado." });
      } else {
        res.status(200).json({ message: "Menú ha sido eliminado correctamente." });
      }
    }
  });
};
