const router = require("express").Router();

const actualitiesCtrl = require("../controllers/actualities");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

// News
router.post("/add", auth, multer, actualitiesCtrl.createActuality); // Enregistrer une nouvelle actualité
router.get("/", auth, actualitiesCtrl.getAllActualities); // Afficher toutes les actualités
router.get("/contain", auth, actualitiesCtrl.getAllActualitiesWithTitleContaint); // Afficher tous les actualités dont le titre contient...
router.get("/:id", auth, actualitiesCtrl.getOneActuality); // Afficher une actualité
router.put("/:id", auth, multer, actualitiesCtrl.updateActuality); // Modifier une actualité
router.delete("/:id", auth, multer, actualitiesCtrl.deleteActuality); // Supprimer une actualité

module.exports = router;
