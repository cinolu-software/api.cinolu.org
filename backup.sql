/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.25-MariaDB, for osx10.16 (x86_64)
--
-- Host: localhost    Database: cinolu
-- ------------------------------------------------------
-- Server version	10.5.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`answers`)),
  `programId` varchar(36) DEFAULT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cf336e5a3d2e9c4448abbfa594c` (`programId`),
  KEY `FK_b4ae3fea4a24b4be1a86dacf8a2` (`userId`),
  CONSTRAINT `FK_b4ae3fea4a24b4be1a86dacf8a2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_cf336e5a3d2e9c4448abbfa594c` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call`
--

DROP TABLE IF EXISTS `call`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `call` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `form` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`form`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call`
--

LOCK TABLES `call` WRITE;
/*!40000 ALTER TABLE `call` DISABLE KEYS */;
/*!40000 ALTER TABLE `call` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_application`
--

DROP TABLE IF EXISTS `call_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `call_application` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`answers`)),
  `callId` varchar(36) DEFAULT NULL,
  `applicantId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_33cd532c88faa7f946db418ad96` (`callId`),
  KEY `FK_31182549a933a19b1daa918f037` (`applicantId`),
  CONSTRAINT `FK_31182549a933a19b1daa918f037` FOREIGN KEY (`applicantId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_33cd532c88faa7f946db418ad96` FOREIGN KEY (`callId`) REFERENCES `call` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_application`
--

LOCK TABLES `call_application` WRITE;
/*!40000 ALTER TABLE `call_application` DISABLE KEYS */;
/*!40000 ALTER TABLE `call_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `call_application_review`
--

DROP TABLE IF EXISTS `call_application_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `call_application_review` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `status` enum('pending','shortlisted','accepted','rejected') NOT NULL DEFAULT 'pending',
  `comment` text DEFAULT NULL,
  `applicationId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a559795f047ebcea0fd4ea306f9` (`applicationId`),
  CONSTRAINT `FK_a559795f047ebcea0fd4ea306f9` FOREIGN KEY (`applicationId`) REFERENCES `call_application` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `call_application_review`
--

LOCK TABLES `call_application_review` WRITE;
/*!40000 ALTER TABLE `call_application_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `call_application_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('08421668-9083-41e3-9a23-932ebbb1d03c','2024-11-27 08:05:40.085115','2024-11-27 08:06:47.000000',NULL,'Promotion et sensibilisation '),('2093e44e-b0ed-4896-9b65-a6c3420ded77','2024-11-27 08:04:30.733404','2024-11-27 08:04:30.733404',NULL,'Renforcement de capacité'),('cbf9b12a-dd6a-4af7-beba-4dea06c04df9','2024-11-27 08:09:30.967355','2024-11-27 08:09:30.967355',NULL,'Développement organisationnel'),('f1008777-0b00-46e2-b8c8-179855c912e7','2024-11-25 14:46:33.771370','2024-11-27 08:07:10.000000',NULL,'Accompagnement de projets'),('f14640fb-51b4-4585-91e7-c1996046d2ee','2024-11-25 14:46:34.068638','2024-11-25 14:46:51.000000','2024-11-25 14:46:51.000000','Accompagnement et Développement');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail`
--

DROP TABLE IF EXISTS `detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `bio` text NOT NULL,
  `socials` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`socials`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail`
--

LOCK TABLES `detail` WRITE;
/*!40000 ALTER TABLE `detail` DISABLE KEYS */;
INSERT INTO `detail` VALUES ('47533df2-0614-4f5b-9ebd-35a2e08c8c98','2024-12-06 16:26:28.967044','2024-12-06 16:26:28.967044',NULL,'Ma bio',NULL),('f842c31d-f19e-46d4-8333-0b52b49259b2','2024-12-06 11:18:50.669494','2024-12-06 11:56:39.000000',NULL,'Je teste un peu ',NULL);
/*!40000 ALTER TABLE `detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_expertises`
--

DROP TABLE IF EXISTS `detail_expertises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_expertises` (
  `detailId` varchar(36) NOT NULL,
  `expertiseId` varchar(36) NOT NULL,
  PRIMARY KEY (`detailId`,`expertiseId`),
  KEY `IDX_7dd9446d9806e9c3824e293b14` (`detailId`),
  KEY `IDX_6bf66263ebbf0068f6f57affa3` (`expertiseId`),
  CONSTRAINT `FK_6bf66263ebbf0068f6f57affa3f` FOREIGN KEY (`expertiseId`) REFERENCES `expertise` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_7dd9446d9806e9c3824e293b14d` FOREIGN KEY (`detailId`) REFERENCES `detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_expertises`
--

LOCK TABLES `detail_expertises` WRITE;
/*!40000 ALTER TABLE `detail_expertises` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_expertises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_positions`
--

DROP TABLE IF EXISTS `detail_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_positions` (
  `detailId` varchar(36) NOT NULL,
  `positionId` varchar(36) NOT NULL,
  PRIMARY KEY (`detailId`,`positionId`),
  KEY `IDX_3f240c51458baaedf6f205b694` (`detailId`),
  KEY `IDX_c91842a6257733bde99315bba9` (`positionId`),
  CONSTRAINT `FK_3f240c51458baaedf6f205b6947` FOREIGN KEY (`detailId`) REFERENCES `detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_c91842a6257733bde99315bba90` FOREIGN KEY (`positionId`) REFERENCES `position` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_positions`
--

LOCK TABLES `detail_positions` WRITE;
/*!40000 ALTER TABLE `detail_positions` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `programId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f2bf8d12e931bb9eee1ec1e9975` (`programId`),
  CONSTRAINT `FK_f2bf8d12e931bb9eee1ec1e9975` FOREIGN KEY (`programId`) REFERENCES `phase` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `started_at` date NOT NULL,
  `attendees` bigint(20) NOT NULL DEFAULT 0,
  `event_type` enum('physical','online') NOT NULL DEFAULT 'physical',
  `online_link` varchar(255) DEFAULT NULL,
  `ended_at` date NOT NULL,
  `responsibleId` varchar(36) DEFAULT NULL,
  `is_published` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_e195b4c478ace2cf124c13ed11e` (`responsibleId`),
  CONSTRAINT `FK_e195b4c478ace2cf124c13ed11e` FOREIGN KEY (`responsibleId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_type`
--

DROP TABLE IF EXISTS `event_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_type` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_type`
--

LOCK TABLES `event_type` WRITE;
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_types`
--

DROP TABLE IF EXISTS `event_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_types` (
  `eventId` varchar(36) NOT NULL,
  `eventTypeId` varchar(36) NOT NULL,
  PRIMARY KEY (`eventId`,`eventTypeId`),
  KEY `IDX_2d843ba18ac120966355111606` (`eventId`),
  KEY `IDX_d5bbf08cf7d0a3487a362bfcc7` (`eventTypeId`),
  CONSTRAINT `FK_2d843ba18ac1209663551116065` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d5bbf08cf7d0a3487a362bfcc71` FOREIGN KEY (`eventTypeId`) REFERENCES `event_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_types`
--

LOCK TABLES `event_types` WRITE;
/*!40000 ALTER TABLE `event_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertise`
--

DROP TABLE IF EXISTS `expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expertise` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise`
--

LOCK TABLES `expertise` WRITE;
/*!40000 ALTER TABLE `expertise` DISABLE KEYS */;
/*!40000 ALTER TABLE `expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1733322342820,'Init1733322342820'),(2,1733475078570,'FixUserRelation1733475078570'),(3,1733736711641,'AddVentures1733736711641'),(4,1733737701663,'AddIspublished1733737701663');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner`
--

DROP TABLE IF EXISTS `partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `website_link` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner`
--

LOCK TABLES `partner` WRITE;
/*!40000 ALTER TABLE `partner` DISABLE KEYS */;
INSERT INTO `partner` VALUES ('09c1450e-bb10-410d-90f2-184c311e1e27','2024-11-25 14:59:08.023335','2024-11-27 08:21:23.000000',NULL,'AFRICALIA','Creativity is a solid foundation for a new African economy. Art, culture and creativity are fundamental to the lives of communities and individuals.\n\nCulture is what makes us human. It is a fundamental right. Creativity and imagination allow us to emancipate and liberate ourselves. Participating in culture is as essential as water for people and stimulates global change, both social and political. Creativity is not a luxury, it is an inexhaustible, non-polluting, peaceful resource that creates dignified and sustainable jobs.\n\nSince 2001, we have been working with artists and cultural organisations active in various contemporary artistic disciplines: audiovisual, performing arts, literature and visual arts. Our mission is to support, collaborate, structure and network these creators in order to include culture and creativity at the centre of economic innovation and social transformation in Africa. We also mobilise the Belgian cultural sector to raise public awareness of African creativity.','https://africalia.be/','44df2bb7-5dc5-41f6-9598-ff4358583d2e.jpeg'),('1dc600aa-3604-4567-85c5-0b06be470d29','2024-11-27 09:02:49.874666','2024-11-27 09:35:41.000000',NULL,'Enabel ','Enabel is the development agency of Belgium’s federal government\nOur mission is to implement the policy priorities of the Belgian governmental cooperation and to promote sustainable international solidarity.','https://www.enabel.be','a39b5fa7-0e6a-4915-a833-b7fa4ddd31f0.webp'),('3fe870a5-9f3e-4a65-a5a9-7586e7c207c1','2024-11-27 09:28:27.006614','2024-11-27 09:29:23.000000',NULL,'Institut français de Bukavu','Organe majeur de la coopération culturelle à Bukavu, l’Institut français de Bukavu participe à la promotion de la langue française, favorise les échanges artistiques et le dialogue culturel pluridisciplinaire.','https://www.institutfrancaisbukavu.com','c26453e1-a969-469e-9c15-f6257630c335.png'),('66866d1e-52d3-4ca9-9f05-90a2c3a493f3','2024-11-27 07:35:51.909106','2024-11-27 08:33:19.000000',NULL,'UKAMILI Digital City ','Ukamili Digital City c\'est avant tout une vision fédératrice, un espace physique commun, des ressources partagées, un réseau d\'acteurs complémentaires, une alliance Triple helix, des services cohérents, pour le developpement de la region Grand Katanga.','https://www.ukamili.africa/','c5c17417-17e2-4898-9b42-663c7dc70869.png'),('78bd14db-8392-458b-9990-3b7e11de10bc','2024-11-26 13:19:27.588246','2024-11-27 08:40:06.000000',NULL,'Ovation','Ovation est un centre de ressources pour les incubateurs et accélérateurs d’entreprises qui exploite les méthodes de créativité et d’innovation les plus efficaces.','https://www.ovation.eco/','f7a472af-bf5f-4bbd-9f6b-1eff5b0671d6.png'),('7ce9ec10-1671-44be-b126-1e06b5aea830','2024-11-27 09:50:33.353332','2024-11-27 09:51:27.000000',NULL,'Programme des Nations unies pour le développement','Le Programme des Nations unies pour le développement (PNUD) fait partie des programmes et fonds de l\'ONU. Son rôle est d\'aider les pays en développement en leur fournissant des conseils mais également en plaidant leurs causes pour l\'octroi de dons. C\'est ainsi que ce programme travaille en collaboration avec de nombreux autres programmes comme l\'Onusida et d\'autres organisations internationales (UPU et OMS notamment). Son siège est situé à New York, aux États-Unis.','https://www.undp.org/fr','e7be0bf0-04d1-4ec9-8b28-477cee76b9fc.png'),('901f1311-c66e-4cdb-a48c-5edf4e3ebb1f','2024-11-27 09:17:14.041469','2024-11-27 09:30:44.000000',NULL,'Fondation Roi Baudouin','epuis plus de 45 ans, la Fondation Roi Baudouin agit en faveur de l’intérêt général, en collaboration avec de nombreux partenaires, experts et donateurs. Notre action vise à produire des changements durables et positifs dans la société, en Belgique, en Europe et ailleurs dans le monde.','https://kbs-frb.be/fr','e3b1cdec-0202-45e5-94b9-8d98c52b57d9.png'),('a0bec993-eb66-4e52-9095-6961f3fdb27e','2024-11-27 09:00:15.919530','2024-11-27 09:32:07.000000',NULL,'Segal Family Foundation','We celebrate Africa. We champion African leaders. We want African ingenuity to get the financial backing it deserves.\n\nOur all-African grantmaking team and extensive local network equips visionary doers and donors with the resources and connections they need to advance positive change.','https://www.segalfamilyfoundation.org/','63423f42-8806-4ece-b19c-ecfd964e1b85.png'),('c896dba0-6229-4474-854a-e14255aebbff','2024-11-27 09:44:48.577411','2024-11-27 09:45:37.000000',NULL,'Centre d\'Innovation de Lubumbashi','Le Centre d\'Innovation de Lubumbashi, communément appelé Cinolu en sigle, est un hub d\'innovation créé en 2015 dans la ville de Lubumbashi en RDC.\n\nNous offrons du renforcement des capacités et un soutien aux entreprises en phase de démarrage (startups et PME) à travers des formations, du coaching et du mentorat, des services d\'incubation et de conseil. Pour les entreprises, les investisseurs et les institutions financières internationales (IFIs), nous proposons un soutien à l\'innovation ouverte, des services de gestion de projet ainsi qu\'une communauté sélectionnée d\'innovateurs avec qui collaborer.','https://cinolu.org/','b3f58534-ccb2-4b8a-9456-97e3e4becc77.png'),('e5f5166c-81dd-4597-8a43-dcbb0d164a02','2024-11-27 09:14:24.491994','2024-11-27 09:34:10.000000',NULL,'Fondation Rachel Forrest','La Fondation Rachel Forrest (FRF) a pour vocation de développer et de coordonner des projets humanistes au bénéfice des populations locales, en République Démocratique du Congo.\n\nBasée à Lubumbashi, la Fondation Rachel Forrest a été créée par le Groupe Forrest International (GFI S.A) et est présidée aujourd’hui par Madame Lydia Forrest, épouse de George Arthur Forrest, Président du Groupe Forrest.','https://forrestgroup.com/secteur/fondation-rachel-forrest/','88bc4555-57c7-4fb9-af40-e7064a3b0512.png');
/*!40000 ALTER TABLE `partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_partnerships`
--

DROP TABLE IF EXISTS `partner_partnerships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_partnerships` (
  `partnerId` varchar(36) NOT NULL,
  `partnershipId` varchar(36) NOT NULL,
  PRIMARY KEY (`partnerId`,`partnershipId`),
  KEY `IDX_c85a39fefb2689f9f5370287a8` (`partnerId`),
  KEY `IDX_6582d84eb0b6f8300447ed9817` (`partnershipId`),
  CONSTRAINT `FK_6582d84eb0b6f8300447ed98176` FOREIGN KEY (`partnershipId`) REFERENCES `partnership` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c85a39fefb2689f9f5370287a89` FOREIGN KEY (`partnerId`) REFERENCES `partner` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_partnerships`
--

LOCK TABLES `partner_partnerships` WRITE;
/*!40000 ALTER TABLE `partner_partnerships` DISABLE KEYS */;
INSERT INTO `partner_partnerships` VALUES ('09c1450e-bb10-410d-90f2-184c311e1e27','401c871b-bb56-4818-978c-5c73b64c0028'),('1dc600aa-3604-4567-85c5-0b06be470d29','401c871b-bb56-4818-978c-5c73b64c0028'),('3fe870a5-9f3e-4a65-a5a9-7586e7c207c1','401c871b-bb56-4818-978c-5c73b64c0028'),('66866d1e-52d3-4ca9-9f05-90a2c3a493f3','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('78bd14db-8392-458b-9990-3b7e11de10bc','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('7ce9ec10-1671-44be-b126-1e06b5aea830','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('901f1311-c66e-4cdb-a48c-5edf4e3ebb1f','401c871b-bb56-4818-978c-5c73b64c0028'),('a0bec993-eb66-4e52-9095-6961f3fdb27e','401c871b-bb56-4818-978c-5c73b64c0028'),('c896dba0-6229-4474-854a-e14255aebbff','401c871b-bb56-4818-978c-5c73b64c0028'),('c896dba0-6229-4474-854a-e14255aebbff','7eb4ec6c-e3cd-4814-9d18-65f2154fdb63'),('c896dba0-6229-4474-854a-e14255aebbff','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('c896dba0-6229-4474-854a-e14255aebbff','be3e27d7-e1c5-4ffa-8828-93a0e35f69c9'),('e5f5166c-81dd-4597-8a43-dcbb0d164a02','401c871b-bb56-4818-978c-5c73b64c0028');
/*!40000 ALTER TABLE `partner_partnerships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partnership`
--

DROP TABLE IF EXISTS `partnership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partnership` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partnership`
--

LOCK TABLES `partnership` WRITE;
/*!40000 ALTER TABLE `partnership` DISABLE KEYS */;
INSERT INTO `partnership` VALUES ('401c871b-bb56-4818-978c-5c73b64c0028','2024-11-25 14:50:42.728530','2024-11-27 08:28:10.000000',NULL,'Partenaire Financier (Sponsor ou bailleur de fonds)'),('7eb4ec6c-e3cd-4814-9d18-65f2154fdb63','2024-11-27 08:26:20.374546','2024-11-27 08:29:45.000000',NULL,'Fournisseur de service '),('b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890','2024-11-27 07:33:11.425132','2024-11-27 08:29:22.000000',NULL,'Parternaire de mise en œuvre (Contractant ou consultant)'),('be3e27d7-e1c5-4ffa-8828-93a0e35f69c9','2024-11-27 08:25:58.645304','2024-11-27 08:25:58.645304',NULL,'Echange de service');
/*!40000 ALTER TABLE `partnership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase`
--

DROP TABLE IF EXISTS `phase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phase` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `started_at` datetime NOT NULL,
  `ended_at` datetime NOT NULL,
  `programId` varchar(36) DEFAULT NULL,
  `form` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`form`)),
  PRIMARY KEY (`id`),
  KEY `FK_a251d108b40a8021a4359caeb7e` (`programId`),
  CONSTRAINT `FK_a251d108b40a8021a4359caeb7e` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase`
--

LOCK TABLES `phase` WRITE;
/*!40000 ALTER TABLE `phase` DISABLE KEYS */;
INSERT INTO `phase` VALUES ('8e422946-5545-4bff-bba9-17cffdcede23','2024-11-27 07:39:33.656958','2024-11-27 14:49:40.000000',NULL,'Appel à candidatures','Le programme Mozalisi L\'shi, initié par asbl AFRICALIA vzw et mis en œuvre par Ukamili Digital City, est conçu pour vous accompagner dans votre développement entrepreneurial et créatif à travers :','2024-11-22 00:00:00','2024-12-19 00:00:00','bd53ce02-0fa3-4e5d-a88a-86ec2e194977',NULL);
/*!40000 ALTER TABLE `phase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `started_at` date NOT NULL,
  `ended_at` date NOT NULL,
  `targeted_audience` text NOT NULL,
  `aim` text DEFAULT NULL,
  `prize` text DEFAULT NULL,
  `town` varchar(255) DEFAULT NULL,
  `is_published` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES ('4955359a-5403-4a0c-913c-8a42869b019f','2024-11-27 09:51:40.385266','2024-11-27 15:00:09.000000',NULL,'Fikiri Sdg','4a9663f6-6b74-4519-9ca7-463378f9e548.jpeg','Programme dédiée à la cartographie, l\'exploration et l\'expérimentation des solutions innovantes locales pour accélérer l\'atteinte des Objectifs de Développement durables .','2023-10-31','2024-01-30','Entrepreneurs','Cartographie des solutions innovantes','Cartographie des solutions innovantes','RDC',0),('bd53ce02-0fa3-4e5d-a88a-86ec2e194977','2024-11-25 15:06:42.837268','2024-11-27 14:52:08.000000',NULL,'Mozalisi L’shi','4ccce655-4480-4b1b-9cca-f2912cac9f25.jpeg','Mozalisi L’shi est un programme d’entrepreneuriat à l’initiative d’Africalia et déployé\npar Ukamili Digital City et Africalia. Il vise à consolider les entreprises luchoises\névoluant dans les industries culturelles et créatives (ICC), dont les secteurs d’activité\nont pour objet principal la création, le développement, la production, la reproduction,\nla promotion, la diffusion ou la commercialisation de biens, de services et activités qui\nont un contenu culturel, artistique et/ou patrimonial.','2024-11-24','2025-11-24','Les entrepreneur.e.s luchois.es qui opèrent dans le secteur culturel et\ncréatif et qui génèrent des revenus grâce à leur activité économique (produit ou\nservice), mais dont la gestion et la stratégie entrepreneuriale et opérationnelle\nnécessitent encore des ajustements.','Accompagner des jeunes entreprises du secteur culturel\net créatif dans la consolidation et la croissance de leur activité entrepreneuriale','Un parcours d’incubation composé de modules de formation et d’un suivi\nsur mesure sous forme de business coaching et de mentorat créatif, renforçant les\nentreprises tant au niveau des capacités de gestion entrepreneuriale que sur le plan\ncréatif et culturel.','Lubumbashi, RDC',0),('d2c13dbf-0db8-478c-9002-d5b3ba3e47e6','2024-11-27 09:45:53.617176','2024-11-27 14:59:09.000000',NULL,'Binti Share','5be15ff1-102b-439e-bb6e-a96030a2f9e9.jpeg','Serie d\'ateliers en ligne sur differentes thématique en faveur des femmes entrepreneurs','2023-12-31','2024-03-30','Femmes','Accompagnement','Accompagnement','Lubumbashi',0),('f5a608e1-d3d1-4e56-9546-38d2df50c2a5','2024-11-26 13:23:26.425836','2024-11-27 14:56:36.000000',NULL,'L-Impact','1d00e776-20ee-4ab8-bc9c-418a7b19f1cb.jpeg','L-Impact est un programme d\'incubation collectif, immersif et intensif de 6 mois avec des coaches locaux et internationaux spécialisés dans l\'entrepreneuriat.','2023-12-20','2024-03-30','Entrepreneurs','Incubation des projets','Incubation des projets','Lubumbashi',0);
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_categories`
--

DROP TABLE IF EXISTS `program_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program_categories` (
  `programId` varchar(36) NOT NULL,
  `categoryId` varchar(36) NOT NULL,
  PRIMARY KEY (`programId`,`categoryId`),
  KEY `IDX_0024194a585e55ead317be949f` (`programId`),
  KEY `IDX_8516a3b399822b154597b22fc2` (`categoryId`),
  CONSTRAINT `FK_0024194a585e55ead317be949ff` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_8516a3b399822b154597b22fc27` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_categories`
--

LOCK TABLES `program_categories` WRITE;
/*!40000 ALTER TABLE `program_categories` DISABLE KEYS */;
INSERT INTO `program_categories` VALUES ('4955359a-5403-4a0c-913c-8a42869b019f','08421668-9083-41e3-9a23-932ebbb1d03c'),('bd53ce02-0fa3-4e5d-a88a-86ec2e194977','f1008777-0b00-46e2-b8c8-179855c912e7'),('d2c13dbf-0db8-478c-9002-d5b3ba3e47e6','f1008777-0b00-46e2-b8c8-179855c912e7'),('f5a608e1-d3d1-4e56-9546-38d2df50c2a5','f1008777-0b00-46e2-b8c8-179855c912e7');
/*!40000 ALTER TABLE `program_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_partners`
--

DROP TABLE IF EXISTS `program_partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program_partners` (
  `programId` varchar(36) NOT NULL,
  `partnerId` varchar(36) NOT NULL,
  PRIMARY KEY (`programId`,`partnerId`),
  KEY `IDX_0bd24970b5d5af86eb70db324f` (`programId`),
  KEY `IDX_3dc64ed72399fb3c40ffc92257` (`partnerId`),
  CONSTRAINT `FK_0bd24970b5d5af86eb70db324ff` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_3dc64ed72399fb3c40ffc922574` FOREIGN KEY (`partnerId`) REFERENCES `partner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_partners`
--

LOCK TABLES `program_partners` WRITE;
/*!40000 ALTER TABLE `program_partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `program_partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program_types`
--

DROP TABLE IF EXISTS `program_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `program_types` (
  `programId` varchar(36) NOT NULL,
  `typeId` varchar(36) NOT NULL,
  PRIMARY KEY (`programId`,`typeId`),
  KEY `IDX_bdf28310b9d3b46206d4af849e` (`programId`),
  KEY `IDX_07bec1f774bf3a158032e69981` (`typeId`),
  CONSTRAINT `FK_07bec1f774bf3a158032e699813` FOREIGN KEY (`typeId`) REFERENCES `type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_bdf28310b9d3b46206d4af849ef` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program_types`
--

LOCK TABLES `program_types` WRITE;
/*!40000 ALTER TABLE `program_types` DISABLE KEYS */;
INSERT INTO `program_types` VALUES ('4955359a-5403-4a0c-913c-8a42869b019f','9187f52f-d70f-412e-a041-99befd5a281f'),('bd53ce02-0fa3-4e5d-a88a-86ec2e194977','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('d2c13dbf-0db8-478c-9002-d5b3ba3e47e6','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('f5a608e1-d3d1-4e56-9546-38d2df50c2a5','f56b7f4c-948b-422f-8865-15b4dd8fb04b');
/*!40000 ALTER TABLE `program_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requirement`
--

DROP TABLE IF EXISTS `requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requirement` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `phaseId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ed3de91a28a36881c5e90283fdd` (`phaseId`),
  CONSTRAINT `FK_ed3de91a28a36881c5e90283fdd` FOREIGN KEY (`phaseId`) REFERENCES `phase` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requirement`
--

LOCK TABLES `requirement` WRITE;
/*!40000 ALTER TABLE `requirement` DISABLE KEYS */;
/*!40000 ALTER TABLE `requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `status` enum('pending','shortlisted','accepted','rejected') NOT NULL DEFAULT 'pending',
  `note` float NOT NULL,
  `comment` text NOT NULL,
  `applicationId` varchar(36) DEFAULT NULL,
  `reviwerId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8d5525f4acba6e2149fb5da4a8c` (`applicationId`),
  KEY `FK_bea8f7bc6860508ea240f4725ab` (`reviwerId`),
  CONSTRAINT `FK_8d5525f4acba6e2149fb5da4a8c` FOREIGN KEY (`applicationId`) REFERENCES `application` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_bea8f7bc6860508ea240f4725ab` FOREIGN KEY (`reviwerId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('1278e4ec-db80-4bdd-b840-39e7f8386aa1','2024-11-25 14:05:55.665145','2024-11-25 14:05:55.665145',NULL,'coach'),('31f1b044-edd0-4aa4-936b-16ce430116e2','2024-11-25 14:05:55.659639','2024-11-25 14:05:55.659639',NULL,'staff'),('c4e41230-da4f-4c8d-8990-a1a0045d55fa','2024-11-25 14:05:55.652125','2024-11-25 14:05:55.652125',NULL,'admin'),('d7196630-d96a-4fc2-bcd0-cf95aee9bd92','2024-11-25 14:05:55.659260','2024-11-25 14:05:55.659260',NULL,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sector` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES ('2cfa6302-4f1a-417a-b524-c64683d9e054','2024-11-27 08:12:46.008298','2024-11-27 08:12:46.008298',NULL,'Renforcement de capacité','Formation et atelier d\'acquisition de compétences '),('3a7aa2bc-83a5-4edd-9358-1b2aa882980f','2024-11-27 08:18:44.481708','2024-11-27 08:18:44.481708',NULL,'Connexions,  Réseautage','Mise en relation des innovateurs et des entrepreneurs avec les acteurs, les partenaires et les clients disponibles dans l\'écosystème '),('5ec94159-38c8-4dfc-88f3-c9ca3db24a0a','2024-11-27 08:11:01.672940','2024-11-27 08:11:01.672940',NULL,'Speed dating','Connexion aux investisseurs '),('9187f52f-d70f-412e-a041-99befd5a281f','2024-11-27 08:16:32.498182','2024-11-27 14:34:00.000000',NULL,'Cartographie et promotion ','Identification et promotion des acteurs et des initiatives dans l\'écosystème (secteur, industrie ou marché)'),('f3748e58-e7e7-4197-bcf8-4ec35c005b51','2024-11-27 08:10:17.170445','2024-11-27 08:10:17.170445',NULL,'Mentorat','Programme de mentorat'),('f56b7f4c-948b-422f-8865-15b4dd8fb04b','2024-11-25 14:43:45.931496','2024-11-27 09:19:34.000000',NULL,'Incubation','Programme dédié à l\'accompagnement des startups et porteurs de projets, offrant mentorat, formation, accès aux ressources et opportunités pour développer et accélérer leur croissance.');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `google_image` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `detailId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  UNIQUE KEY `REL_f05fcc9b589876b45e82e17b31` (`detailId`),
  CONSTRAINT `FK_f05fcc9b589876b45e82e17b313` FOREIGN KEY (`detailId`) REFERENCES `detail` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10','2024-12-03 13:11:05.516890','2024-12-03 14:16:27.000000',NULL,'josuev@cinolu.org','Josué Vangu','$2b$10$qSU1YG3pq.MBO0GHDSucVewtpHOBIyAagmtzLTkNLudWkYnesiX6K','+243812656895','Lubumbashi, RDC',NULL,'6c8bf66a-ee64-48b1-bc30-0d5c4a55f321.webp','2024-12-03 13:11:05',NULL),('13d2aaea-4c0e-425c-b458-d7320846c3df','2024-12-03 13:36:32.534049','2024-12-03 13:37:38.000000',NULL,'wilfriedm@cinolu.org',' Wilfried Musanzi ','$2b$10$QUyNYuO7fw8WiLhwGXOh1.xYnhAUe6xo9wAlQ7yA0VVflpzr9Pt.S','+243979265726','Lubumbashi, RDC',NULL,'f252e7d9-63be-4e87-af60-c5bc0f8b2e45.webp','2024-12-03 13:36:32',NULL),('282dbbe7-bd29-4c19-803f-45d08caee861','2024-12-03 13:27:07.500584','2024-12-03 13:37:19.000000',NULL,'moisez@cinolu.org',' Moses KALUNGA ','$2b$10$0jOmOsXAsoigwmETwU4WQOt/U8M0S9VkP52CvA86VcEK7ENE0X5QS','+243992422969','Lubumbashi, RDC',NULL,'bebe676c-4649-4e88-845a-f76d093364e2.webp','2024-12-03 13:27:07',NULL),('30ec1712-09d7-47b7-a633-3849b3e98827','2024-11-25 14:05:55.711163','2024-12-06 16:26:29.000000',NULL,'admin@admin.com','Admin','$2b$10$vKNuRyTUQP06w0Z6lHyg2./A98.hsVdH1Kl0csGZ6Y3TxzpSez4Z6','445.423.2388 x0419','2349 Trantow Crescent',NULL,NULL,'2024-11-25 01:23:45','47533df2-0614-4f5b-9ebd-35a2e08c8c98'),('41aaaed0-fcbe-4404-be65-d3c4bd01d8cb','2024-11-28 08:36:12.044157','2024-12-02 13:41:42.000000',NULL,'joycem@cinolu.org','Joyce Mishika','$2b$10$31Na5YaKdkBSCtmQupPLKOjfEYUJquynTjOh3zf8PHroS3RV4/lGO','+243824263063','Lubumbashi, RDC',NULL,'54826be0-7e69-4751-947f-c0a489d4f8eb.webp','2024-11-28 08:36:11',NULL),('69d37916-e408-4d78-bc6a-7cbfe6e5132b','2024-11-28 08:41:14.844643','2024-12-03 08:16:36.000000',NULL,'compta@cinolu.org','Dave Ilunga ','$2b$10$UA2RqheHe9c28d9TM7hSd.04U6L0zq7SmOvG1q2Lww2uHbjzzgqnC','+243898579885','Lubumbashi, RDC',NULL,'5966e1fa-b801-4bca-9ecc-240a98625696.jpeg','2024-11-28 08:41:14',NULL),('71368b8a-5b12-4638-86a3-760d2310fcae','2024-11-28 08:49:15.449854','2024-12-03 13:21:17.000000',NULL,'lydias@cinolu.org','Lydia Saku','$2b$10$pM4NZBXHuK1vBZHvQH3VpOimXR82v.9dDaTIH8EXuq3bVwq75PSim','+243821512898','Lubumbashi, RDC',NULL,'a43a1860-5dd3-456b-940a-8fdfaa62e0bc.webp','2024-11-28 08:49:15',NULL),('80f283ff-0239-4db1-8678-762bd6ca5689','2024-11-28 08:51:52.016057','2024-12-02 13:36:48.000000',NULL,'rodriguezm@cinolu.org','Rodriguez Monga','$2b$10$4gWW8f9NWEHwia6jP/sSc.UecM7maN0AQUUJgZUnGIgNHxjX2hdZ.','+2439907240951','Lubumbashi, RDC',NULL,'babacbfb-9934-49e3-8078-13ccf54e7611.webp','2024-11-28 08:51:51',NULL),('958b40c2-1d1c-4a4e-a128-276490827264','2024-12-01 10:29:55.687097','2024-12-01 11:30:29.000000',NULL,'mukengeshayisymphorien@gmail.com','MUKENGESHAY MULAMBA SYMPHORIEN ','$2b$10$SLUO.3WxW.b/B2n5rI9YRutZOCB5PqYjbXkPtfWL5nskcWFZLqTA2','0992220003','Ville de Lubumbashi, commune Lubumbashi, quartier gambela 2, avenue chemin public, numéro 15','https://lh3.googleusercontent.com/a/ACg8ocJMesC9qnET2_PiANiHhJ9JyCj-tFQgpW1ONQerJHh-eeIXHZ26=s96-c',NULL,'2024-12-01 11:30:29',NULL),('a1879d9e-686c-445a-ac89-e8ad68b3fcc3','2024-12-05 10:34:19.687684','2024-12-06 14:05:18.000000',NULL,'musanziwilfried@gmail.com','Wilfried Musanzi','$2b$10$x0gWZQcRXZO7kkR/orJAvu3Xhd53QOxWdhfpnq1Gf32f0JjRNavra','+243979254726','Lubumbashi, RDC','https://lh3.googleusercontent.com/a/ACg8ocKMRN2W3app13mL_OPheufF9jn4A_Pk6J7PoPGUa95qIOMMpL88=s96-c','e6464b76-5e1e-4ac5-b569-602c26ced732.webp','2024-12-06 12:07:30','f842c31d-f19e-46d4-8333-0b52b49259b2'),('d4eccd26-f79a-4838-a624-bd62f05c50cb','2024-11-28 21:40:53.285906','2024-11-28 21:40:53.285906',NULL,'BerryN@lunnovel.org','Berry Numbi',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocLiXysVwYX0h9FcYNJa4zvJCvFE7fls-S-J7tJzwqnW2_qm2zo=s96-c',NULL,'2024-11-28 21:40:53',NULL),('d9aa7676-e835-4797-9f7b-c09dba17a533','2024-11-28 08:43:00.735408','2024-12-03 13:34:04.000000',NULL,'reception@cinolu.org','Megan Madia','$2b$10$q4uH6u2LYhy.R/swd8EL1uVhGQn9h37vFzOWnHp4NNNa6XX4k4tnW','+243978651966','Lubumbashi, RDC',NULL,'73643735-bd96-4cef-b09a-9a7d58a58444.webp','2024-11-28 08:43:00',NULL),('dee6400e-f87e-41fc-aa88-54d8431aa374','2024-11-28 08:44:32.794590','2024-12-02 13:25:51.000000',NULL,'evamut07@gmail.com','Evelyne Mutombo','$2b$10$DdrwALHOnDAFXHhhLE7fJ.8CkB1KXaK2iXGIAIzuc/3wCF.05vK2m','+24397680700','Lubumbashi, RDC',NULL,'1e983866-7687-44f8-9078-e8f14a04c27b.jpeg','2024-11-28 08:44:32',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_enrolled_programs`
--

DROP TABLE IF EXISTS `user_enrolled_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_enrolled_programs` (
  `userId` varchar(36) NOT NULL,
  `programId` varchar(36) NOT NULL,
  PRIMARY KEY (`userId`,`programId`),
  KEY `IDX_a83f3e2dcd82ff426143e4e9e6` (`userId`),
  KEY `IDX_a8b8ba6648fe3b4e646cb4a809` (`programId`),
  CONSTRAINT `FK_a83f3e2dcd82ff426143e4e9e66` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_a8b8ba6648fe3b4e646cb4a8090` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_enrolled_programs`
--

LOCK TABLES `user_enrolled_programs` WRITE;
/*!40000 ALTER TABLE `user_enrolled_programs` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_enrolled_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `userId` varchar(36) NOT NULL,
  `roleId` varchar(36) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `IDX_472b25323af01488f1f66a06b6` (`userId`),
  KEY `IDX_86033897c009fcca8b6505d6be` (`roleId`),
  CONSTRAINT `FK_472b25323af01488f1f66a06b67` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_86033897c009fcca8b6505d6be2` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10','31f1b044-edd0-4aa4-936b-16ce430116e2'),('08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('13d2aaea-4c0e-425c-b458-d7320846c3df','31f1b044-edd0-4aa4-936b-16ce430116e2'),('13d2aaea-4c0e-425c-b458-d7320846c3df','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('282dbbe7-bd29-4c19-803f-45d08caee861','31f1b044-edd0-4aa4-936b-16ce430116e2'),('30ec1712-09d7-47b7-a633-3849b3e98827','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('41aaaed0-fcbe-4404-be65-d3c4bd01d8cb','31f1b044-edd0-4aa4-936b-16ce430116e2'),('69d37916-e408-4d78-bc6a-7cbfe6e5132b','31f1b044-edd0-4aa4-936b-16ce430116e2'),('71368b8a-5b12-4638-86a3-760d2310fcae','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('71368b8a-5b12-4638-86a3-760d2310fcae','31f1b044-edd0-4aa4-936b-16ce430116e2'),('71368b8a-5b12-4638-86a3-760d2310fcae','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('80f283ff-0239-4db1-8678-762bd6ca5689','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('80f283ff-0239-4db1-8678-762bd6ca5689','31f1b044-edd0-4aa4-936b-16ce430116e2'),('80f283ff-0239-4db1-8678-762bd6ca5689','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('958b40c2-1d1c-4a4e-a128-276490827264','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('a1879d9e-686c-445a-ac89-e8ad68b3fcc3','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('d4eccd26-f79a-4838-a624-bd62f05c50cb','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('d4eccd26-f79a-4838-a624-bd62f05c50cb','31f1b044-edd0-4aa4-936b-16ce430116e2'),('d4eccd26-f79a-4838-a624-bd62f05c50cb','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('d9aa7676-e835-4797-9f7b-c09dba17a533','31f1b044-edd0-4aa4-936b-16ce430116e2'),('dee6400e-f87e-41fc-aa88-54d8431aa374','31f1b044-edd0-4aa4-936b-16ce430116e2');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venture`
--

DROP TABLE IF EXISTS `venture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venture` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `pitch` varchar(255) NOT NULL,
  `founding_date` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `stage` enum('Stade de l''idée ou du concept,','Phase de démarrage','Phase de croissance','Phase de maturité') NOT NULL,
  `is_published` tinyint(4) NOT NULL DEFAULT 0,
  `socials` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`socials`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venture`
--

LOCK TABLES `venture` WRITE;
/*!40000 ALTER TABLE `venture` DISABLE KEYS */;
/*!40000 ALTER TABLE `venture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventures_sectors`
--

DROP TABLE IF EXISTS `ventures_sectors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventures_sectors` (
  `ventureId` varchar(36) NOT NULL,
  `sectorId` varchar(36) NOT NULL,
  PRIMARY KEY (`ventureId`,`sectorId`),
  KEY `IDX_cdac3f38cf086f7dc962713fa1` (`ventureId`),
  KEY `IDX_fad1d549fe046d8ad32c0b66b3` (`sectorId`),
  CONSTRAINT `FK_cdac3f38cf086f7dc962713fa12` FOREIGN KEY (`ventureId`) REFERENCES `venture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_fad1d549fe046d8ad32c0b66b35` FOREIGN KEY (`sectorId`) REFERENCES `sector` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventures_sectors`
--

LOCK TABLES `ventures_sectors` WRITE;
/*!40000 ALTER TABLE `ventures_sectors` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventures_sectors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 13:53:54
