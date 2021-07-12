const db = require("../models");
const bcrypt = require("bcrypt");

const { RESIDENCE_CODE } = process.env;

// Fonction qui crée le code de la résidence dans la base de données à la connexion s'il n'existe pas
function setResidence(req, res) {
  db.residence
    .findOne({ where: { id: 1 } })
    .then((residence) => {
      if (!residence) {
        bcrypt
          .hash(RESIDENCE_CODE, 10)
          .then((hash) => {
            db.residence
              .create({
                code: hash,
              })
              .then((code) => {
                console.log({
                  message: `le code de la résidence est bien créé !`,
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
        console.log({ message: "le code de la résidence est déjà créé" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = setResidence();
