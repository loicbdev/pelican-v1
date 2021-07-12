const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

exports.valid = (req, res, next) => {
  // on vérifie le password et l'email
  const passwordSchema = new passwordValidator();
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .symbols(); // Must have symbols

  if (!emailValidator.validate(req.body.email)) {
    return res.status(401).send({
      error: "Merci de vérifier ton adresse mail!",
    });
  } else if (!passwordSchema.validate(req.body.password)) {
    return res.status(401).send({
      error:
        "Ton mot de passe doit être de 8 caractères au minimum (avec majuscules, minuscules et au moins un symbole)!",
    });
  } else if (
    emailValidator.validate(req.body.email) ||
    passwordSchema.validate(req.body.password)
  ) {
    next();
  }
};
exports.checkPseudo = (req, res, next) => {
  // on vérifie le pseudo
  const regex = /^[a-zA-Z0-9_]{3,30}$/; // Lettres, espaces et doit être entre 3 et 30 caractères
  const pseudo = req.body.pseudo;
  if (regex.test(pseudo) === true) {
    next();
  } else {
    return res.status(401).send({
      error:
        "Votre pseudo doit être de 3 caractères minimum et 30 maximum, sont acceptés les lettres, chiffres et underscore (_)  ",
    });
  }
};
