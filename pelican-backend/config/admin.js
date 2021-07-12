const db = require("../models");
const bcrypt = require("bcrypt");

const { ADMIN_PSEUDO, ADMIN_MAIL, ADMIN_PASSWORD } = process.env;

// Fonction qui crée le compte admin dans la base de données à la connexion s'il n'existe pas
function setAdmin(req, res) {
  db.user
    .findOne({ where: { email: ADMIN_MAIL } || { pseudo: ADMIN_PSEUDO } })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(ADMIN_PASSWORD, 10)
          .then((hash) => {
            db.user
              .create({
                pseudo: ADMIN_PSEUDO,
                email: ADMIN_MAIL,
                password: hash,
                admin: true,
              })
              .then((admin) => {
                console.log({
                  admin,
                  message: `Votre compte admin est bien créé ${admin.pseudo} !`,
                });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      } else {
        console.log({ message: "le compte administrateur est déjà créé" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = setAdmin();
