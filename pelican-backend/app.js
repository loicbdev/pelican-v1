const express = require("express");
const morgan = require("morgan"); // HTTP request logger middleware
const cors = require("cors");
/* const path = require("path"); The path module provides utilities for working with file and directory paths. */
const helmet = require("helmet"); // helmet helps you secure Express apps by setting various HTTP headers

require("dotenv").config();

// routes
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");
const actualitiesRoutes = require("./routes/actualities");

// db
const { sequelize } = require("./models/index");

// initialisation de Express
const app = express();

// app.use(cors()); Ici, toutes les requêtes entre serveurs sont autorisées.

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(morgan("tiny")); // Utilisation d'un format prédéfini ("tiny" : simple logging without too much information in the logs)
app.use(express.json()); // Activation du raw (json)
app.use(express.urlencoded({ extended: true })); // Activation de x-wwww-form-urlencoded
app.use(helmet()); // helmet

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/actualities", actualitiesRoutes);

// app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/upload", express.static("upload"));

const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
dbTest();

module.exports = app;
