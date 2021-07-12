CREATE DATABASE  IF NOT EXISTS `pelican_development` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pelican_development`;
-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: pelican_development
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actuality`
--

DROP TABLE IF EXISTS `actuality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actuality` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `message` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `actuality_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actuality`
--

LOCK TABLES `actuality` WRITE;
/*!40000 ALTER TABLE `actuality` DISABLE KEYS */;
INSERT INTO `actuality` VALUES (1,'Report de la fête des voisins à septembre 2021','L’évolution de la crise sanitaire nous oblige à reporter la Fête des Voisins prévue initialement. ​Elle aura donc lieu le vendredi 24 septembre 2021 et nous permettra enfin de nous retrouver, de nous embrasser, de trinquer à la « liberté retrouvée ». Nous ferons, tous ensemble, de cette 22ème édition, l’événement national majeur de sortie de crise.','https://www.lafetedesvoisins.fr/',NULL,'2021-06-13 11:05:16','2021-06-13 12:26:58',1),(2,'Assemblée générale de notre résidence (15/06/2021)','<p align=\"left\"><span style=\"font-family: Roboto, sans-serif;\"><span style=\"font-size: medium;\">Notre prochaine assembl&eacute;e g&eacute;n&eacute;rale aura lieu le&nbsp;</span></span><span style=\"font-family: Roboto, sans-serif;\"><span style=\"font-size: medium;\"><strong><em>mardi 15/06/2021&nbsp;&agrave; partir de 15h</em></strong></span></span><span style=\"font-family: Roboto, sans-serif;\"><span style=\"font-size: medium;\">&nbsp;dans la salle Espace Sainte-Madeleine - 5 bd Babin Chevaye - 44200 Nantes.</span></span></p>\n<p align=\"left\"><span style=\"font-family: Roboto, sans-serif;\"><span style=\"font-size: medium;\">Si vous ne pouvez pas vous y rendre, vous pouvez soit donner votre pouvoir &agrave; un autre r&eacute;sident, soit retourner au Syndic votre bulletin de vote par correspondance&nbsp;</span></span><em><span style=\"font-family: Roboto, sans-serif;\"><span style=\"font-size: medium;\"><strong>au plus tard le mercredi 09/06/2021</strong></span></span></em><span style=\"font-family: Roboto, sans-serif;\"><span style=\"font-size: medium;\">.</span></span></p>',NULL,NULL,'2021-06-13 11:05:59','2021-06-13 11:05:59',1);
/*!40000 ALTER TABLE `actuality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Je peux te prêter un râteau à main, un seau et une petite pelle. ?','2021-06-13 11:14:02','2021-06-13 11:14:02',3,1),(2,'Ça m\'intéresse. Je te contacte par mail.','2021-06-13 11:15:31','2021-06-13 11:15:31',2,2),(3,'Hello! J\'ai 2 pots de fleur et 1 jardinière que je n\'utilise pas si ça t\'intéresse?','2021-06-13 11:18:19','2021-06-13 11:18:19',2,1),(4,'Je suis intéressé aussi!','2021-06-13 11:19:42','2021-06-13 11:19:42',4,2),(5,'Ils ont de très bons légumes à prix abordable. Je recommande.','2021-06-13 11:20:46','2021-06-13 11:20:46',4,3);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (1,'2021-06-13 11:15:15','2021-06-13 11:15:15',2,2),(2,'2021-06-13 11:19:43','2021-06-13 11:19:43',4,2),(3,'2021-06-13 11:55:20','2021-06-13 11:55:20',4,3),(4,'2021-06-13 12:20:39','2021-06-13 12:20:39',3,1);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Bonjour à tous! Je recherche des outils de jardinage pour mettre des plantes sur mon balcon.',NULL,NULL,'2021-06-13 11:09:44','2021-06-13 11:09:44',4),(2,'Je propose un co-voiturage lundi prochain à 8h30 pour Rennes.',NULL,NULL,'2021-06-13 11:14:42','2021-06-13 11:14:42',3),(3,'Nouveau magasin à tester à Rezé ?','https://youtu.be/g4wzrt0RTIE',NULL,'2021-06-13 11:17:18','2021-06-13 11:17:18',2);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `residence`
--

DROP TABLE IF EXISTS `residence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `residence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residence`
--

LOCK TABLES `residence` WRITE;
/*!40000 ALTER TABLE `residence` DISABLE KEYS */;
INSERT INTO `residence` VALUES (1,'$2b$10$D.C6eXgWsFIc8lyat9/RV.tiQEJdRdDn50mTG6DiBmz9SnKFOo3oa','2021-06-24 14:29:23','2021-06-24 14:29:23');
/*!40000 ALTER TABLE `residence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `building` int DEFAULT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@mail.com','$2b$10$E/cFbTcJmtPv5vadKiL.c.3Af/LgJ4TP.pe7Ykqxr0FoKfRo1mmni',NULL,8,'Je suis le modérateur du site.',1,'2021-06-13 10:21:16','2021-06-13 11:06:33'),(2,'userOne','userone@mail.com','$2b$10$8/GHJ7DMebWKoYdS..H/gez/Y06JNNH6HZW9Yb/3Dnc8HwJT1lyLy','http://localhost:3000/upload/avatar-femme1623582727291.png',2,NULL,0,'2021-06-13 11:07:57','2021-06-13 11:12:07'),(3,'userTwo','usertwo@mail.com','$2b$10$qV1cuhDN7AuByFAoLWmlAe3IhnLQx8Hsz4RZOACX78rESB7trroSi','http://localhost:3000/upload/avatar-homme1623582775081.png',4,'J\'aime bricoler.',0,'2021-06-13 11:08:26','2021-06-13 11:12:55'),(4,'userThree','userthree@mail.com','$2b$10$a.OXqlA0eBGSe821M5vOx.xHbE4B6.xBg5f2fK3UPJkQaUqH2Y.Te',NULL,6,NULL,0,'2021-06-13 11:08:54','2021-06-13 11:08:54');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'pelican_development'
--

--
-- Dumping routines for database 'pelican_development'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-24 16:37:51
