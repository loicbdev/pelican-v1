const token = require("../middlewares/token");
const db = require("../models"); // accès aux tables
const fs = require("fs"); // accès à des opérations liées aux systèmes de fichiers
const { Op } = require("sequelize");

// Récupère toutes les actualités
exports.getAllActualities = async (req, res) => {
  try {
    const actualities = await db.actuality.findAll({
      attributes: ["id", "title", "message", "imageUrl", "link", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.user,
          attributes: ["pseudo", "id"],
        },
      ],
    });
    res.status(200).send(actualities);
  } catch (error) {
    return res.status(500).send({
      error: "une erreur est survenue lors de la récupération des actualités ",
    });
  }
};

// Récupère tous les tutoriels dont le titre contient...
exports.getAllActualitiesWithTitleContaint = async (req, res) => {
  try {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const actualities = await db.actuality.findAll({
      attributes: ["id", "title", "message", "imageUrl", "link", "createdAt"],
      where: condition,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.user,
          attributes: ["pseudo", "id"],
        },
      ],
    });
    res.status(200).send(actualities);
  } catch (error) {
    return res.status(500).send({
      error: "une erreur est survenue lors de la récupération des actualités ",
    });
  }
};

// Récupère une actualité en fonction de son id
exports.getOneActuality = async (req, res) => {
  try {
    const actuality = await db.actuality.findOne({
      // on récupère l'actualité' avec l'id fourni en incluant les tables et attributs nécessaires
      where: { id: req.params.id },
      include: [
        {
          model: db.user,
          attributes: ["pseudo", "id"],
        },
      ],
    });
    res.status(200).json(actuality);
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Crée une nouvelle actualité
exports.createActuality = async (req, res) => {
  const userId = token.getUserId(req);
  const checkAdmin = await db.user.findOne({ where: { id: userId } });
  let imageUrl;
  try {
    const user = await db.user.findOne({
      attributes: ["pseudo", "id"],
      where: { id: userId },
    });
    if (checkAdmin.admin === true) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
      } else {
        imageUrl = null;
      }
      const actuality = await db.actuality.create({
        include: [
          {
            model: db.user,
            attributes: ["pseudo", "id"],
          },
        ],
        title: req.body.title,
        message: req.body.message,
        link: req.body.link,
        imageUrl: imageUrl,
        userId: user.id,
      });

      res.status(201).json({ actuality: actuality, messageRetour: "votre actualité est ajoutée" });
    } else {
      res.status(401).send({ error: "erreur" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Modifie une actualité
exports.updateActuality = async (req, res) => {
  try {
    let newImageUrl;
    const userId = token.getUserId(req);
    const checkAdmin = await db.user.findOne({ where: { id: userId } });
    let actuality = await db.actuality.findOne({ where: { id: req.params.id } });
    if (checkAdmin.admin === true) {
      if (req.file) {
        // Si il y a une nouvelle image
        newImageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
        if (actuality.imageUrl) {
          const filename = actuality.imageUrl.split("/upload")[1];
          fs.unlink(`upload/${filename}`, (err) => {
            // Supprime l'ancienne image
            if (err) console.log(err);
            else {
              console.log(`Deleted file: upload/${filename}`);
            }
          });
        }
      }
      if (req.body.title) {
        actuality.title = req.body.title;
      }
      if (req.body.message) {
        actuality.message = req.body.message;
      }
      if (req.body.link) {
        actuality.link = req.body.link;
      }
      actuality.imageUrl = newImageUrl;
      const newActuality = await actuality.save({
        fields: ["title", "message", "link", "imageUrl"],
      });
      res.status(200).json({ newActuality: newActuality, messageRetour: "actualité modifiée" });
    } else {
      res.status(401).json({ message: "vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Supprime une actualité
exports.deleteActuality = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.user.findOne({ where: { id: userId } });
    const actuality = await db.actuality.findOne({ where: { id: req.params.id } });
    if (checkAdmin.admin === true) {
      if (actuality.imageUrl) {
        const filename = actuality.imageUrl.split("/upload")[1];
        fs.unlink(`upload/${filename}`, () => {
          db.actuality.destroy({ where: { id: actuality.id } });
          res.status(200).json({ message: "actualité supprimée" });
        });
      } else {
        db.actuality.destroy({ where: { id: actuality.id } }, { truncate: true });
        res.status(200).json({ message: "actualité supprimée" });
      }
    } else {
      res.status(401).json({ message: "vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};
