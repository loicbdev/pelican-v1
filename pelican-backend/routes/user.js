const router = require("express").Router();
const rateLimit = require("express-rate-limit"); // Contre les attaques par force brute

const userCtrl = require("../controllers/user");
const authUser = require("../middlewares/authUser");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limitation de chaque IP à 10 requêtes par "windowMS"
  message: "Too many accounts created from this IP",
});

// Authentification
router.post("/signup", authUser.checkPseudo, authUser.valid, userCtrl.signup); // Enregistrer un nouvel utilisateur
router.post("/login", limiter, authUser.valid, userCtrl.login); // Connecter un utilisateur déjà existant
// Comptes
router.get("/accounts", auth, userCtrl.getAllUsers); // Renvoyer tous les comptes
router.get("/accounts/:id", auth, userCtrl.getAccount); // Renvoyer les données liées à un compte
router.put("/accounts/:id", auth, multer, userCtrl.updateAccount); // Modifier un compte
router.delete("/accounts/:id", auth, userCtrl.deleteAccount); // Supprimer un compte

module.exports = router;
