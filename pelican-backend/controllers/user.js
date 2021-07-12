const bcrypt = require("bcrypt"); // hachage du password
const db = require("../models"); // modèles de la bdd
const token = require("../middlewares/token"); // middleware qui génère le token
const fs = require("fs");
// const { Op } = require("sequelize");

// Création d'un compte utilisateur
exports.signup = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { email: req.body.email },
    });
    const residence = await db.residence.findOne({
      where: { id: 1 },
    });
    const hashCode = await bcrypt.compare(req.body.code, residence.code); // on compare les codes
    if (!hashCode) {
      return res.status(401).json({ error: "le code de la résidence est erroné !" });
    }
    if (user !== null) {
      if (user.pseudo === req.body.pseudo) {
        return res.status(401).json({ error: "ce pseudo est déjà utilisé !" });
      } else if (user.email === req.body.email) {
        return res.status(401).json({ error: "cet email est déjà utilisé !" });
      }
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await db.user.create({
        pseudo: req.body.pseudo,
        building: req.body.building,
        email: req.body.email,
        password: hash,
        admin: false,
      });
      const tokenObject = token.issueJWT(newUser);
      res.status(201).send({
        user: newUser,
        token: tokenObject.token,
        expires: tokenObject.expiresIn,
        message: `votre compte est bien créé ${newUser.pseudo} !`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Connexion à un compte utilisateur existant
exports.login = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { email: req.body.email },
    }); // on vérifie que l'adresse mail figure bien dans la bdd
    if (!user) {
      return res.status(401).send({ error: "utilisateur non trouvé !" });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passe
      if (!hash) {
        return res.status(401).send({ error: "mot de passe incorrect !" });
      } else {
        const tokenObject = token.issueJWT(user);
        res.status(200).send({
          // on renvoie le user et le token
          user: user,
          token: tokenObject.token,
          sub: tokenObject.sub,
          expires: tokenObject.expiresIn,
          message: "Bonjour " + user.pseudo + " !",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Fournit un compte en fonction de son user id
exports.getAccount = async (req, res) => {
  // on trouve l'utilisateur et on renvoie l'objet user
  try {
    const user = await db.user.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Fournit la liste des comptes
exports.getAllUsers = async (req, res) => {
  // on envoie tous les users
  try {
    const users = await db.user.findAll({
      attributes: ["pseudo", "id", "photo", "building", "bio", "email"],
      /** where: {
      *   id: {
      *     [Op.ne]: 1,
      *   },
      }, */
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Modifie un compte (profil)
exports.updateAccount = async (req, res) => {
  const id = req.params.id;
  try {
    const userId = token.getUserId(req);
    let newPhoto;
    let user = await db.user.findOne({ where: { id: id } }); // on trouve le user
    if (userId === user.id) {
      if (req.file && user.photo) {
        newPhoto = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
        const filename = user.photo.split("/upload")[1];
        fs.unlink(`upload/${filename}`, (err) => {
          // s'il y avait déjà une photo on la supprime
          if (err) console.log(err);
          else {
            console.log(`Deleted file: upload/${filename}`);
          }
        });
      } else if (req.file) {
        newPhoto = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
      }
      if (newPhoto) {
        user.photo = newPhoto;
      }
      if (req.body.building) {
        user.building = req.body.building;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.bio) {
        user.bio = req.body.bio;
      }
      if (req.body.pseudo) {
        user.pseudo = req.body.pseudo;
      }
      if (req.body.password) {
        const newHash = await bcrypt.hash(req.body.password, 10);
        user.password = newHash;
      }
      const newUser = await user.save({
        fields: ["pseudo", "email", "password", "building", "bio", "photo"],
      }); // on sauvegarde les changements dans la bdd
      res.status(200).json({
        user: newUser,
        messageRetour: `votre profil a bien été modifié ${newUser.pseudo}`,
      });
    } else {
      res.status(401).json({ messageRetour: "vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Supprime un compte
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.user.findOne({ where: { id: id } });
    if (user.photo !== null) {
      const filename = user.photo.split("/upload")[1];
      fs.unlink(`upload/${filename}`, () => {
        // s'il y a une photo on la supprime et on supprime le compte
        db.user.destroy({ where: { id: id } });
        res.status(200).json({ messageRetour: "utilisateur supprimé" });
      });
    } else {
      db.user.destroy({ where: { id: id } }); // on supprime le compte
      res.status(200).json({ messageRetour: "utilisateur supprimé" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};
