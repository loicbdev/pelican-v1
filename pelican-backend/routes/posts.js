const router = require("express").Router();

const postsCtrl = require("../controllers/posts");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

// Posts
router.post("/add", auth, multer, postsCtrl.createPost); // Enregistrer un nouveau post
router.get("/", auth, postsCtrl.getAllPosts); // Afficher tous les posts
router.get("/hot", auth, postsCtrl.getHotPosts); // Afficher les posts les plus likés
router.get("/:id", auth, postsCtrl.getOnePost); // Afficher un post
router.get("/user/:id", auth, postsCtrl.getUserPosts); // Afficher tous les posts d'un user
router.put("/:id", auth, multer, postsCtrl.updatePost); // Modifier un post
router.delete("/:id", auth, multer, postsCtrl.deletePost); // Supprimer un post
// Likes
router.post("/:id/like", auth, postsCtrl.likePost);
// Commentaires
router.post("/:id/comments", auth, postsCtrl.addComment); // Ajouter un commentaire
router.delete("/comments/:id", auth, postsCtrl.deleteComment); // Supprimer un commentaire

module.exports = router;
