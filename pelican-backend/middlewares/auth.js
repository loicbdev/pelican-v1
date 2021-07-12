const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // on récupère le token de la requête entrante
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET); // on le vérifie grâce au ACCESS_TOKEN_SECRET
    const userId = decodedToken.sub; // on récupère l'userId du token
    if (req.body.userId && req.body.userId !== userId) {
      // on compare l'userId de la requête à celui du token
      throw "Invalid userId !";
    } else {
      next(); // Si il est juste, on passe au middleware suivant
    }
  } catch (error) {
    res.status(401).json({ error: new Error("Invalid request !") });
  }
};
