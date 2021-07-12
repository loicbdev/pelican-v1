const JWT = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = process.env;

function issueJWT(user) {
  // on génère le token
  const id = user.id;
  const expiresIn = "4H";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: expiresIn });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
function getUserId(req) {
  // on vérifie le userId du token
  const token = req.headers.authorization.split(" ")[1]; // on récupère le token de la requête entrante
  const decodedToken = JWT.verify(token, ACCESS_TOKEN_SECRET); // on le vérifie
  const userId = decodedToken.sub;
  return userId; // on récupère l'id du token
}

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;
