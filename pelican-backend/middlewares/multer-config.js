const multer = require("multer");

const MIME_TYPES = {
  // Dictionnaire d'extensions
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/bmp": "bmp",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  // Enregistrer sur le disque
  destination: (req, file, callback) => {
    // Dossier où l'on enregistre les images
    callback(null, "upload");
  },
  filename: (req, file, callback) => {
    // Nom du fichier
    // nouveau nom du fichier image pour éviter les doublons
    const name = file.originalname
      .replace(/\.[^/.]+$/, "")
      .split(" ")
      .join("_");
    const extension = MIME_TYPES[file.mimetype];
    // Nom entier = nom + date + . + extension
    callback(null, name + Date.now() + "." + extension);
  },
});

// Stockage de l'image publiée (fichier unique image)
module.exports = multer({ storage: storage }).single("image"); 
