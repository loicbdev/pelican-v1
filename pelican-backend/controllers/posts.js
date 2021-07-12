const token = require("../middlewares/token");
const db = require("../models"); // accès aux tables
const fs = require("fs"); // accès à des opérations liées aux systèmes de fichiers

// Récupère tous les posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.post.findAll({
      attributes: ["id", "message", "imageUrl", "link", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.user,
          attributes: ["id", "pseudo", "photo", "building"],
        },
        {
          model: db.favorite,
          attributes: ["userId"],
        },
        {
          model: db.comment,
          attributes: ["message", "userId", "id", "createdAt"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: db.user,
              attributes: ["photo", "pseudo"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "une erreur est survenue lors de la récupération des posts ",
    });
  }
};
// Affiche les posts les plus likés en premier
exports.getHotPosts = async (req, res) => {
  try {
    const posts = await db.post.findAll({
      attributes: [
        "id",
        "message",
        "imageUrl",
        "link",
        "createdAt",
        [
          db.sequelize.literal("(SELECT COUNT(*) FROM favorite WHERE favorite.postId = post.id)"),
          "LikeCount",
        ],
      ],
      order: [[db.sequelize.literal("LikeCount"), "DESC"]],

      include: [
        {
          model: db.user,
          attributes: ["id", "pseudo", "photo", "building"],
        },
        {
          model: db.favorite,
          attributes: ["postId", "userId"],
        },
        {
          model: db.comment,
          order: [["createdAt", "DESC"]],
          attributes: ["message", "userId", "id", "createdAt"],
          include: [
            {
              model: db.user,
              attributes: ["photo", "pseudo"],
            },
          ],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "une erreur est survenue lors de la récupération des posts",
    });
  }
};

// Récupère un post en fonction de son id
exports.getOnePost = async (req, res) => {
  try {
    const post = await db.post.findOne({
      // on récupère le post avec l'id fourni en incluant les tables et attributs nécessaires
      where: { id: req.params.id },
      include: [
        {
          model: db.user,
          attributes: ["id", "pseudo", "photo"],
        },
        {
          model: db.favorite,
          attributes: ["postId", "userId"],
        },
        {
          model: db.comment,
          order: [["createdAt", "DESC"]],
          attributes: ["message", "userId"],
          include: [
            {
              model: db.user,
              attributes: ["photo", "pseudo"],
            },
          ],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Récupère tous les posts d'un utilisateur en fonction de son id (post.userId)
exports.getUserPosts = async (req, res) => {
  try {
    const post = await db.post.findAll({
      // on récupère les posts avec l'userId fourni en incluant les tables et attributs nécessaires
      where: { userId: req.params.id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.user,
          attributes: ["id", "pseudo", "photo", "building"],
        },
        {
          model: db.favorite,
          attributes: ["postId", "userId"],
        },
        {
          model: db.comment,
          order: [["createdAt", "DESC"]],
          attributes: ["message", "userId", "id", "createdAt"],
          include: [
            {
              model: db.user,
              attributes: ["photo", "pseudo"],
            },
          ],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Crée un nouveau post
exports.createPost = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    let imageUrl;
    const user = await db.user.findOne({
      attributes: ["id", "pseudo", "photo"],
      where: { id: userId },
    });
    if (user !== null) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
      } else {
        imageUrl = null;
      }
      const post = await db.post.create({
        include: [
          {
            model: db.user,
            attributes: ["id", "pseudo", "photo"],
          },
        ],
        message: req.body.message,
        link: req.body.link,
        imageUrl: imageUrl,
        userId: user.id,
      });
      res.status(201).json({ post: post, messageRetour: "votre post est ajouté" });
    } else {
      res.status(401).send({ error: "erreur" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Supprime un post
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.user.findOne({ where: { id: userId } });
    const post = await db.post.findOne({ where: { id: req.params.id } });
    if (userId === post.userId || checkAdmin.admin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/upload")[1];
        fs.unlink(`upload/${filename}`, () => {
          db.post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: "post supprimé" });
        });
      } else {
        db.post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: "post supprimé" });
      }
    } else {
      res.status(401).json({ message: "vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Modifie un post
exports.updatePost = async (req, res) => {
  try {
    let newImageUrl;
    const userId = token.getUserId(req);
    let post = await db.post.findOne({ where: { id: req.params.id } });
    if (userId === post.userId) {
      if (req.file) {
        // Si il y a une nouvelle image
        newImageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/upload")[1];
          fs.unlink(`upload/${filename}`, (err) => {
            // Supprime l'ancienne image
            if (err) console.log(err);
            else {
              console.log(`Deleted file: upload/${filename}`);
            }
          });
        }
      }
      if (req.body.message) {
        post.message = req.body.message;
      }
      if (req.body.link) {
        post.link = req.body.link;
      }
      post.imageUrl = newImageUrl;
      const newPost = await post.save({
        fields: ["message", "link", "imageUrl"],
      });
      res.status(200).json({ newPost: newPost, messageRetour: "post modifié" });
    } else {
      res.status(401).json({ message: "vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Permet de liker ou "déliker" un post
exports.likePost = async (req, res, next) => {
  try {
    const userId = token.getUserId(req);
    const postId = req.params.id;
    const user = await db.favorite.findOne({
      where: { userId: userId, postId: postId },
    });
    if (user) {
      await db.favorite.destroy(
        { where: { userId: userId, postId: postId } },
        { truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "vous n'aimez plus ce post" });
    } else {
      await db.favorite.create({
        userId: userId,
        postId: postId,
      });
      res.status(201).json({ messageRetour: "vous aimez ce post" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Ajoute un commentaire
exports.addComment = async (req, res) => {
  try {
    const comment = req.body.commentMessage;
    const newComment = await db.comment.create({
      message: comment,
      userId: token.getUserId(req),
      postId: req.params.id,
    });

    res.status(201).json({ newComment, messageRetour: "votre commentaire est publié" });
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};

// Supprime un commentaire (par l'utilisateur ou par l'admin)
exports.deleteComment = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.user.findOne({ where: { id: userId } });
    const comment = await db.comment.findOne({ where: { id: req.params.id } });

    if (userId === comment.userId || checkAdmin.admin === true) {
      db.comment.destroy({ where: { id: req.params.id } }, { truncate: true });
      res.status(200).json({ message: "commentaire supprimé" });
    } else {
      res.status(401).json({ message: "vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "erreur serveur" });
  }
};
