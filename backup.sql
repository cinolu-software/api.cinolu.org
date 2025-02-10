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
  `userId` varchar(36) DEFAULT NULL,
  `projectId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b4ae3fea4a24b4be1a86dacf8a2` (`userId`),
  KEY `FK_e69389177ac594d36dea539f276` (`projectId`),
  CONSTRAINT `FK_b4ae3fea4a24b4be1a86dacf8a2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e69389177ac594d36dea539f276` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `blog_category`
--

DROP TABLE IF EXISTS `blog_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_category` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_category`
--

LOCK TABLES `blog_category` WRITE;
/*!40000 ALTER TABLE `blog_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_category` ENABLE KEYS */;
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
INSERT INTO `category` VALUES ('08421668-9083-41e3-9a23-932ebbb1d03c','2024-11-27 08:05:40.085115','2024-12-31 14:31:36.000000',NULL,'Programme d\'inclusion  Genre (F360)'),('2093e44e-b0ed-4896-9b65-a6c3420ded77','2024-11-27 08:04:30.733404','2024-12-31 14:31:55.000000',NULL,'Accompagnement pour les mineurs (Ushaidi)'),('2648efb9-b991-41c0-ac23-f00c8064c4e2','2024-12-24 13:04:49.291821','2024-12-24 13:04:49.291821',NULL,'Développement organisationnel'),('4dc9d410-a70f-4607-a8f9-50dfba942d9a','2024-12-21 22:01:59.618016','2024-12-31 14:32:16.000000',NULL,'Accompagnement pour jeunes professionnels & entrepreneurs (Ushindi)'),('cbf9b12a-dd6a-4af7-beba-4dea06c04df9','2024-11-27 08:09:30.967355','2024-12-31 14:32:39.000000',NULL,'Accompagnement pour la recherche & milieu académique (Uvumbuzi)'),('f1008777-0b00-46e2-b8c8-179855c912e7','2024-11-25 14:46:33.771370','2024-12-24 09:52:38.000000',NULL,'Dévelopement de l\'ecosystème'),('f14640fb-51b4-4585-91e7-c1996046d2ee','2024-11-25 14:46:34.068638','2024-11-25 14:46:51.000000','2024-11-25 14:46:51.000000','Accompagnement et Développement');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `message` text NOT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `senderId` varchar(36) DEFAULT NULL,
  `replyToId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c2b21d8086193c56faafaf1b97c` (`senderId`),
  KEY `FK_a3b54539663a129697993bdc19b` (`replyToId`),
  CONSTRAINT `FK_a3b54539663a129697993bdc19b` FOREIGN KEY (`replyToId`) REFERENCES `chat` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `FK_c2b21d8086193c56faafaf1b97c` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `content` text NOT NULL,
  `byId` varchar(36) DEFAULT NULL,
  `postId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d182905d4bfdd0ccae6b3d6c736` (`byId`),
  KEY `FK_94a85bb16d24033a2afdd5df060` (`postId`),
  CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_d182905d4bfdd0ccae6b3d6c736` FOREIGN KEY (`byId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
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
INSERT INTO `detail` VALUES ('47533df2-0614-4f5b-9ebd-35a2e08c8c98','2024-12-06 16:26:28.967044','2024-12-06 16:26:28.967044',NULL,'Ma bio',NULL),('f842c31d-f19e-46d4-8333-0b52b49259b2','2024-12-06 11:18:50.669494','2025-01-08 09:15:54.000000',NULL,'Je teste un peu ',NULL);
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
  `programId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e195b4c478ace2cf124c13ed11e` (`responsibleId`),
  KEY `FK_e2bd221f0e1dcb7bf8174b6ba59` (`programId`),
  CONSTRAINT `FK_e195b4c478ace2cf124c13ed11e` FOREIGN KEY (`responsibleId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e2bd221f0e1dcb7bf8174b6ba59` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('01466fd9-9151-4c8d-9ccc-1918c30505ec','2024-12-26 09:06:02.884101','2024-12-26 09:07:57.000000',NULL,'Timbooktoo Mintech HuB','f9fa3a9c-fb2e-4ca1-abbc-e7b439d43e6e.jpeg','Lubumbashi, RDC','Atelier d\'intelligence collective visant la participation d\'acteurs issus des compagnies minières, des universités, des agences de développement et du secteur priv é dans la province du Haut - Katanga. L\'objectif de cet atelier était d\'explorer les problématiques affectant l\'écosystème minier dans la province du Katanga et de promouvoir la synergie entre les acteurs de cet écosystème. L\'atelier a été facilité par une délégation représentant l\'in itiative Timbuktoo, soutenue par le Programme des Nations Unies pour le Développement (PNUD) en Zambie, et par le Laboratoire d\'Accélération du PNUD en République Démocratique du Congo (RDC). L\'initiative Timbuktoo est un programme soutenu par le PNUD, visant à promouvoir l\'écosystème de l\'innovation en Afrique. En Zambie, l\'initiative se concentre sur le soutien à la création d\'un hub de technologie minière (MineTech), rejoignant ainsi sept au tres hubs soutenant divers autres secteurs, à savoir l\'AgriTech (Ghana), la Fintech (Nigéria), les Industries Créatives (Afrique du Sud), la HealthTech (Rwanda), le Climat Vert/Énergie (Kenya), le Commerce/Logistique/E - Commerce (Égypte), les Villes Intelli gentes/Mobilité (Maroc), et le TourismeTech/EdTech (Sénégal). Les hubs sont développés pour répondre aux grands défis auxquels l\'Afrique est confrontée et pour maximiser les avantages issus de sa \"vague de jeunesse\", qui représente 60 à 70 % de sa population (moins de trente ans). Cette immense masse de jeunes produit chaque année un impressionnant flux de 10 millions de personnes entrant sur le marché du travail, dans un environnement où le s opportunités d\'emploi sont limitées.','2024-08-21',50,'physical','','2024-08-21','08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10',0,NULL),('1b4ecd15-1e3e-481e-9ff6-ef39144f84f7','2024-12-13 08:37:46.145433','2024-12-24 15:02:57.000000',NULL,'AFRILABS ANNUAL GATHERING 2024','c711e44e-431c-4e43-892e-f35b7e3533fb.png','South Africa, Cape Town ','Le rassemblement annuel AfriLabs sert de plate-forme à la communauté de l’innovation africaine pour converger, collaborer et faire avancer la transformation numérique du continent. En 2023, organisé par la ministre rwandaise des TIC, Paula Ingabire, l’événement de Kigali s’est concentré sur « l’accélération de l’économie numérique de l’Afrique ; par la force de notre communauté. Des parties prenantes de divers secteurs se sont réunies pour échanger des connaissances et explorer comment l’action collective peut propulser l’Afrique vers un avenir entièrement numérisé d’ici 2030','2024-11-04',100,'physical','','2024-11-07','80f283ff-0239-4db1-8678-762bd6ca5689',1,NULL),('83be6b04-e705-45a1-93e2-c259d63bd8c2','2024-12-13 09:00:34.741921','2024-12-13 09:42:16.000000',NULL,'Go Binti - levée de fond ','ea53a031-8f66-4cfa-b243-90250d48efbc.png','Ukamili digital city ','Cet atelier vous aidera à comprendre les différentes étapes de la levée de fonds, à définir vos objectifs financiers à court, moyen et long terme, et à vous préparer efficacement pour votre prochaine levée de fonds. 💰','2024-10-30',85,'physical','','2024-10-30','71368b8a-5b12-4638-86a3-760d2310fcae',1,NULL),('bacb8566-cc94-4e9a-808a-8ec590c80b32','2024-12-13 09:25:23.770378','2024-12-25 10:24:30.000000',NULL,'Revup Woman Webinar','5173bcc3-fc43-4997-974e-78f7ac566cca.png','Lubumbashi, RDC','L\'objectif de ce moment est de motiver les femmes entrepreneures à continuer à travailler au développement de leur entreprise et à mettre en pratique tout ce qu\'elles ont appris durant le programme pour la croissance de leur entreprise.','2023-01-18',100,'online','Google Meet.com','2024-01-18','71368b8a-5b12-4638-86a3-760d2310fcae',1,NULL),('eb22024d-1f87-4452-b6cb-c29eef038b79','2024-12-13 09:14:26.813315','2024-12-13 09:44:48.000000',NULL,'Binti innovation week','620318c0-335b-4adb-8082-273c168d06da.jpeg','Ukamili digital city ','Nous vous confirmons que le meet up d\'aujourd\'hui sur le thème \"Ré-imaginer le cadre professionnel au féminin\" avec un focus sur le mindset féminin aura bien lieu.','2024-03-26',100,'physical','','2024-03-26','71368b8a-5b12-4638-86a3-760d2310fcae',1,NULL),('efc92950-7d73-40d1-be04-700186f887e9','2024-12-25 10:21:11.393939','2024-12-26 09:11:18.000000',NULL,'Segal Familly Annnual Meeting ','9320093c-e43d-4244-bc3e-8c8f81d43788.jpeg','Kigali','La ville de Kigali a vu plus de 600 personnes se réunir au nom de la transformation de la manière dont le changement se produit en Afrique, représentant des organisations de toutes les parties de l\'univers de la philanthropie. Il y avait quelque chose pour les acteurs, quelque chose pour les donateurs, et encore plus de choses pour tout le monde. Le ton de la réunion était particulièrement triomphant dans le contexte de la pandémie de COVID-19 qui a vu la dernière AGA se tenir il y a trois an','2023-07-11',1000,'physical','','2023-07-13','08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10',0,NULL);
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
INSERT INTO `event_type` VALUES ('3489145a-ee44-4c53-b196-b8c8ca09f3b2','2024-12-13 08:27:47.197943','2024-12-13 08:27:47.197943',NULL,'Team Building',' Une activité destinée à renforcer les liens entre les participants dans un cadre informel.'),('3e569489-a5af-4587-8e81-6d08e093202e','2024-12-13 08:22:43.527969','2024-12-26 09:12:20.000000',NULL,'Workshop d\'exhibition','Une session interactive où les participants apprennent des compétences spécifiques ou travaillent sur des projets pratiques.'),('3f15c019-3b91-45fe-8455-cc3d4f3db068','2024-12-13 08:25:49.775755','2024-12-13 08:25:49.775755',NULL,'Compétition','Un événement où les participants rivalisent pour montrer leurs compétences ou talents dans un domaine spécifique.'),('519ecf19-b920-42ca-a947-f122cb30d65b','2024-12-13 08:23:07.045159','2024-12-13 08:23:21.000000','2024-12-13 08:23:21.000000','Webinaire','Un événement en ligne permettant à un large public de se connecter pour suivre des présentations ou discussions en direct.\n'),('6268ee08-869f-4377-9a6c-a5c89aac0ffd','2024-12-13 08:25:41.888790','2024-12-13 08:25:41.888790',NULL,'Networking','Un événement conçu pour connecter des individus ou des entreprises afin de développer des opportunités professionnelles ou collaboratives.'),('731a95a0-d8d0-477e-a8dc-89f394784d03','2024-12-13 08:26:30.893673','2024-12-13 08:26:30.893673',NULL,'Séminaire','Une session éducative plus formelle, souvent axée sur une problématique ou un domaine d\'expertise particulier.'),('752b968f-10d4-4c97-824b-dec8f1c23af9','2024-12-13 08:26:58.008100','2024-12-13 08:26:58.008100',NULL,'Forum','Un espace pour des discussions ouvertes et des débats autour de sujets spécifiques, généralement modéré par un expert.'),('823baf8d-871a-407e-811c-05cd562103e9','2024-12-13 08:24:12.307634','2024-12-13 08:24:12.307634',NULL,'Hackathon','Un concours intensif, souvent sur 24 à 72 heures, où des équipes collaborent pour créer des solutions innovantes à un problème donné.'),('8a0a2153-28fa-40a9-b821-49188990a878','2024-12-13 08:20:18.143980','2024-12-13 08:20:18.143980',NULL,'Conférence','Un événement où des experts partagent leurs connaissances sur un sujet spécifique. Peut inclure des discours principaux, des panels de discussion et des sessions interactives.'),('c1504980-8ec1-442a-9155-4457bcb00d8d','2024-12-13 08:25:07.285719','2024-12-13 08:25:07.285719',NULL,'Salon Professionnel','Une exposition où des organisations présentent leurs produits et services à des clients potentiels ou partenaires.'),('d61a5828-a6ec-4d4a-943c-c509bb7218d2','2024-12-26 09:11:48.385165','2024-12-26 09:11:48.385165',NULL,'Visite ','Visite'),('ebeb589b-8586-483f-b5b0-1f97588de16f','2024-12-13 08:23:06.998583','2024-12-13 08:23:06.998583',NULL,'Webinaire','Un événement en ligne permettant à un large public de se connecter pour suivre des présentations ou discussions en direct.\n'),('ed29b213-2081-4fb6-bcc7-88143dda7ec5','2024-12-13 08:27:10.514146','2024-12-13 08:27:10.514146',NULL,'Gala','Une cérémonie formelle pour récompenser des réalisations ou célébrer des succès.');
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
INSERT INTO `event_types` VALUES ('01466fd9-9151-4c8d-9ccc-1918c30505ec','3e569489-a5af-4587-8e81-6d08e093202e'),('1b4ecd15-1e3e-481e-9ff6-ef39144f84f7','752b968f-10d4-4c97-824b-dec8f1c23af9'),('83be6b04-e705-45a1-93e2-c259d63bd8c2','3e569489-a5af-4587-8e81-6d08e093202e'),('bacb8566-cc94-4e9a-808a-8ec590c80b32','ebeb589b-8586-483f-b5b0-1f97588de16f'),('eb22024d-1f87-4452-b6cb-c29eef038b79','3e569489-a5af-4587-8e81-6d08e093202e'),('efc92950-7d73-40d1-be04-700186f887e9','752b968f-10d4-4c97-824b-dec8f1c23af9');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1733322342820,'Init1733322342820'),(2,1733475078570,'FixUserRelation1733475078570'),(3,1733736711641,'AddVentures1733736711641'),(4,1733737701663,'AddIspublished1733737701663'),(5,1733817337376,'UserVenture1733817337376'),(6,1733904282678,'ImgNullable1733904282678'),(7,1733997514084,'PitchlongText1733997514084'),(8,1736239327732,'AddProgram1736239327732'),(9,1737634469227,'AddReport1737634469227'),(10,1737971782583,'Blog1737971782583'),(11,1738135469743,'AddImage1738135469743'),(12,1739175857191,'Chat1739175857191');
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
INSERT INTO `partner` VALUES ('01c7753c-4116-45c9-bc09-ef1abc0e31bb','2024-12-27 08:20:39.633662','2024-12-27 08:26:28.000000',NULL,'Impact Hub','Impact Hub (The Impact Hub Company) est une société mettant en place et exploitant des centres communautaires de travail (coworking). Son siège social est situé à Vienne, en Autriche. Impact Hub communique sur l\'esprit d\'entreprise, l\'incubation d\'idées, le développement des entreprises et le fait de proposer des espaces de travail coopératif.','https://impacthub.net/','d0750dbc-6758-476a-bab0-5b3a50206c58.jpeg'),('09c1450e-bb10-410d-90f2-184c311e1e27','2024-11-25 14:59:08.023335','2024-11-27 08:21:23.000000',NULL,'AFRICALIA','Creativity is a solid foundation for a new African economy. Art, culture and creativity are fundamental to the lives of communities and individuals.\n\nCulture is what makes us human. It is a fundamental right. Creativity and imagination allow us to emancipate and liberate ourselves. Participating in culture is as essential as water for people and stimulates global change, both social and political. Creativity is not a luxury, it is an inexhaustible, non-polluting, peaceful resource that creates dignified and sustainable jobs.\n\nSince 2001, we have been working with artists and cultural organisations active in various contemporary artistic disciplines: audiovisual, performing arts, literature and visual arts. Our mission is to support, collaborate, structure and network these creators in order to include culture and creativity at the centre of economic innovation and social transformation in Africa. We also mobilise the Belgian cultural sector to raise public awareness of African creativity.','https://africalia.be/','44df2bb7-5dc5-41f6-9598-ff4358583d2e.jpeg'),('1dc600aa-3604-4567-85c5-0b06be470d29','2024-11-27 09:02:49.874666','2024-11-27 09:35:41.000000',NULL,'Enabel ','Enabel is the development agency of Belgium’s federal government\nOur mission is to implement the policy priorities of the Belgian governmental cooperation and to promote sustainable international solidarity.','https://www.enabel.be','a39b5fa7-0e6a-4915-a833-b7fa4ddd31f0.webp'),('22d828c7-68b6-475b-8bee-1344fead56b7','2024-12-25 09:42:37.632451','2024-12-25 09:43:23.000000',NULL,'Institut Francais de Lubumbashi','Une plate-forme de diffusion et de rayonnement de la culture, des idées, des valeurs et des savoirs français, européens et congolais.','https://www.xn--institutfranais-lubumbashi-2jc.com/','fd0975f6-463c-4c9a-9ddd-4b1bdfc59696.jpeg'),('283c7394-e6c2-419a-a321-706c2173e182','2024-12-25 09:18:54.916853','2024-12-25 09:19:30.000000',NULL,'Finca Ventures ','FINCA Ventures is an impact investing initiative of FINCA International which builds on over 35 years of experience creating a global microfinance network that delivers financial access at scale. We know the challenges of building an enterprise in the world’s emerging markets and provide patient capital to innovative, high-impact social enterprises that spark household and MSME labor productivity','https://fincaventures.com/','752897ea-68ca-40dd-9df0-dbd755f3573d.jpeg'),('29e673e2-7817-4028-96e8-31960dfc0ae1','2024-12-25 08:23:07.295631','2024-12-25 08:27:19.000000',NULL,'GSA Africa','The African Startup Awards connects the best of African tech startups across the continent to a global network of leading investors and innovation ecosystems. The African Startup Awards will offer startups access to:\n\nNew Markets\n\nFunding Opportunities\n\nA Global Network Of Leaders\n\nExposure On A Global Stage','https://www.globalstartupawardsafrica.com/','b3ecb5dd-3fd2-409d-a08e-9341c2c6a500.jpeg'),('3fe870a5-9f3e-4a65-a5a9-7586e7c207c1','2024-11-27 09:28:27.006614','2024-11-27 09:29:23.000000',NULL,'Institut français de Bukavu','Organe majeur de la coopération culturelle à Bukavu, l’Institut français de Bukavu participe à la promotion de la langue française, favorise les échanges artistiques et le dialogue culturel pluridisciplinaire.','https://www.institutfrancaisbukavu.com','c26453e1-a969-469e-9c15-f6257630c335.png'),('4496dfd7-01e4-4b58-8d4c-b2aad69695d9','2024-12-24 15:06:46.911518','2024-12-24 15:08:59.000000',NULL,'Centre d\'Art Waza','Support artists, researchers, cultural and social actors from Lubumbashi and the region in the development of experimental artistic practices and allow them to create relationships with each other and with the outside world,\nParticipate as an actor in civil society, in an analysis of the questions asked within the communities and in the sharing of knowledge about their environment.','https://www.centredartwaza.org/','bf0b4080-34b8-4002-8437-f9041135214a.jpeg'),('491aee3b-ba42-46d0-837d-2c8509bfe030','2024-12-24 14:42:36.471385','2024-12-24 14:43:12.000000',NULL,'Kinaya Ventures','Launched in 2018, Kinaya Ventures is a Dakar / Abidjan based innovation and investment platform that connects outstanding entrepreneurs to large corporations and investors and fosters open innovation in Sub Saharan Africa.','https://www.kinayaventures.com/','709a1834-611f-4b51-8392-7a4156482230.jpeg'),('66866d1e-52d3-4ca9-9f05-90a2c3a493f3','2024-11-27 07:35:51.909106','2024-11-27 08:33:19.000000',NULL,'UKAMILI Digital City ','Ukamili Digital City c\'est avant tout une vision fédératrice, un espace physique commun, des ressources partagées, un réseau d\'acteurs complémentaires, une alliance Triple helix, des services cohérents, pour le developpement de la region Grand Katanga.','https://www.ukamili.africa/','c5c17417-17e2-4898-9b42-663c7dc70869.png'),('6964bc7d-956f-49b7-bedc-f4732ff2c000','2024-12-24 08:51:27.493014','2024-12-24 14:39:29.000000',NULL,'Afrilabs','AfriLabs is a dynamic innovation-focused organization empowering and building a community around innovation hubs and other stakeholders across various African countries.\n\nThrough active involvement with these hubs and their communities, we actively contribute to cultivating innovators and entrepreneurs, ultimately driving economic growth and social development throughout Africa.','https://www.afrilabs.com/','ddf68687-d3c5-4c26-a580-38ba19f56f0b.jpeg'),('78bd14db-8392-458b-9990-3b7e11de10bc','2024-11-26 13:19:27.588246','2024-11-27 08:40:06.000000',NULL,'Ovation','Ovation est un centre de ressources pour les incubateurs et accélérateurs d’entreprises qui exploite les méthodes de créativité et d’innovation les plus efficaces.','https://www.ovation.eco/','f7a472af-bf5f-4bbd-9f6b-1eff5b0671d6.png'),('7ce9ec10-1671-44be-b126-1e06b5aea830','2024-11-27 09:50:33.353332','2024-12-25 08:36:30.000000',NULL,'Programme des Nations unies pour le développement','Le Programme des Nations unies pour le développement (PNUD) fait partie des programmes et fonds de l\'ONU. Son rôle est d\'aider les pays en développement en leur fournissant des conseils mais également en plaidant leurs causes pour l\'octroi de dons. C\'est ainsi que ce programme travaille en collaboration avec de nombreux autres programmes comme l\'Onusida et d\'autres organisations internationales (UPU et OMS notamment). Son siège est situé à New York, aux États-Unis.','https://www.undp.org/fr','824da936-caea-4897-b1cb-423ade302653.jpeg'),('7fa26551-7746-4169-8d85-d2925b55f2ea','2024-12-24 14:49:11.019417','2024-12-24 14:50:22.000000',NULL,'African Legal Factory','AFL est une structure d\'accompagnement juridique dont le but est de METTRE A DISPOSITION TOUS LES OUTILS JURIDIQUES POUR ACCOMPAGNER NOS ENTREPREURS VERS LEURS SUCCES','https://africanlegalfactory.com/','baa87d40-6dec-44c4-ba69-6c6cf5145d70.jpeg'),('81b40f57-f1ad-4412-a37e-70c166dc60e1','2024-12-25 08:44:55.176116','2024-12-25 08:45:27.000000',NULL,'Make sense Africa','Access to education, development of clean energy, reduction of food waste, development of sustainable agriculture, inclusion of refugees. The problems are complex and global .\nThey will not be solved by one or two organizations, but by a collective mobilization of citizens, entrepreneurs and large organizations. That’s why we created MakeSense.','https://makesense.org/','87255c65-8170-4b26-a50c-4f37c1346cca.jpeg'),('901f1311-c66e-4cdb-a48c-5edf4e3ebb1f','2024-11-27 09:17:14.041469','2024-12-24 14:58:15.000000',NULL,'Fondation Roi Baudouin','epuis plus de 45 ans, la Fondation Roi Baudouin agit en faveur de l’intérêt général, en collaboration avec de nombreux partenaires, experts et donateurs. Notre action vise à produire des changements durables et positifs dans la société, en Belgique, en Europe et ailleurs dans le monde.','https://kbs-frb.be/fr','da8cc006-b65e-4a80-bbd3-899a033c3bd6.jpeg'),('90951633-7455-4085-b415-1c1e9b69fc93','2024-12-25 08:40:07.129019','2024-12-27 07:44:16.000000',NULL,'WETECH','WETECH (Women in Entrepreneurship and Technology) est une plateforme de soutien aux femmes africaines dans les domaines de l’entrepreneuriat et de la technologie. Nous visons à créer un réseau de femmes dynamiques et dirigeantes en leur donnant des opportunités et des ressources pour leur développement par le biais de l’entrepreneuriat et de la technologie. Nous construisons des programmes de mentorat permettant aux filles et aux femmes africaines d’être encadrées par des femmes expérimentées du monde entier. Nous mettons tout aussi un accent sur la formation des femmes africaines en matière d’Entrepreneuriat et Technologie.','https://we-tech.org/','724242a6-97ae-45c1-ad37-00317d9c269d.jpeg'),('97c67216-2866-4dce-bccb-c00c050bcf84','2024-12-24 14:35:32.482413','2024-12-24 14:37:28.000000',NULL,'SMICO','La Société de Microcrédits Congolais, SMICO S.A. est une institution de microfinance au sens de la loi, créée suivant l’acte n° 2951 du 03 Novembre 2009, date de la déclaration de fondation par le président du Conseil d’Administration et enregistrée au registre de commerce et du crédit mobilier sous le numéro CD/GOM/RCCM/16-B-003 avec une identification nationale n° 5-610-N56515G. Son siège social est situé à Goma sis sur Avenue Vanny Bishweka, au n°020, Commune de Goma, Ville de Goma et Province du Nord Kivu.','https://www.smico.net/','e446e914-965a-4700-93d4-414387c06ff8.jpeg'),('a0bec993-eb66-4e52-9095-6961f3fdb27e','2024-11-27 09:00:15.919530','2024-11-27 09:32:07.000000',NULL,'Segal Family Foundation','We celebrate Africa. We champion African leaders. We want African ingenuity to get the financial backing it deserves.\n\nOur all-African grantmaking team and extensive local network equips visionary doers and donors with the resources and connections they need to advance positive change.','https://www.segalfamilyfoundation.org/','63423f42-8806-4ece-b19c-ecfd964e1b85.png'),('b8316e7a-244e-40d9-af96-5364839789f2','2024-12-24 08:51:12.541609','2024-12-24 08:51:12.541609',NULL,'Afrilabs','AfriLabs is a dynamic innovation-focused organization empowering and building a community around innovation hubs and other stakeholders across various African countries.\n\nThrough active involvement with these hubs and their communities, we actively contribute to cultivating innovators and entrepreneurs, ultimately driving economic growth and social development throughout Africa.','https://www.afrilabs.com/',NULL),('be49080a-f959-41cf-8fe0-2bfe74c7977e','2024-12-25 09:05:30.365084','2024-12-25 09:07:59.000000',NULL,'Rlabs','The Reconstructed Lab is  an award-winning global non-profit, established in Bridgetown, Cape Town, in 2009. We have since expanded our model to 25 countries across 5 continents, impacting more than 60 million people.','https://rlabs.org/','f789a1b6-f88c-44e8-8e45-9f7cb56bcb60.jpeg'),('c896dba0-6229-4474-854a-e14255aebbff','2024-11-27 09:44:48.577411','2024-11-27 09:45:37.000000',NULL,'Centre d\'Innovation de Lubumbashi','Le Centre d\'Innovation de Lubumbashi, communément appelé Cinolu en sigle, est un hub d\'innovation créé en 2015 dans la ville de Lubumbashi en RDC.\n\nNous offrons du renforcement des capacités et un soutien aux entreprises en phase de démarrage (startups et PME) à travers des formations, du coaching et du mentorat, des services d\'incubation et de conseil. Pour les entreprises, les investisseurs et les institutions financières internationales (IFIs), nous proposons un soutien à l\'innovation ouverte, des services de gestion de projet ainsi qu\'une communauté sélectionnée d\'innovateurs avec qui collaborer.','https://cinolu.org/','b3f58534-ccb2-4b8a-9456-97e3e4becc77.png'),('ddf1f46d-c322-4a13-bae5-240a5e7c43d4','2024-12-25 07:35:14.848522','2024-12-25 07:35:34.000000',NULL,'Roar Nigeria','Roar Hub is an incubator and accelerator focused on social impact, youth engagement, and innovation. They currently have an incubation program that runs for a period of 3 months and partner with the Science Park in Nsukka for the acceleration of their startups.','https://roarnigeria.org/','14adefcf-ae53-42a9-a505-7475df1cf0fc.jpeg'),('e5f5166c-81dd-4597-8a43-dcbb0d164a02','2024-11-27 09:14:24.491994','2024-11-27 09:34:10.000000',NULL,'Fondation Rachel Forrest','La Fondation Rachel Forrest (FRF) a pour vocation de développer et de coordonner des projets humanistes au bénéfice des populations locales, en République Démocratique du Congo.\n\nBasée à Lubumbashi, la Fondation Rachel Forrest a été créée par le Groupe Forrest International (GFI S.A) et est présidée aujourd’hui par Madame Lydia Forrest, épouse de George Arthur Forrest, Président du Groupe Forrest.','https://forrestgroup.com/secteur/fondation-rachel-forrest/','88bc4555-57c7-4fb9-af40-e7064a3b0512.png'),('e9ae7dc7-4e9c-4179-83c2-15c2e16391a4','2024-12-25 12:14:12.646991','2024-12-25 12:15:08.000000',NULL,'Digital Africa','Formation , acces financement , renforcement de capacite','https://digital-africa.co/','3dd21284-3df3-4919-813d-8f31f03ba0ed.jpeg'),('eaab7d0b-f40a-4894-97c9-2c271a0d5b41','2024-12-25 07:57:40.137283','2024-12-25 08:00:10.000000',NULL,'Electher','Electher is a social entreprise investing in the inclusion of Women in Social, Economic, and Public-life across Africa','https://elect-her.org/','3e9324db-fd61-44cf-8ec8-49d911255f37.jpeg'),('f1f227d3-5a53-4f88-8b2e-3969061cbabf','2024-12-25 08:30:11.829329','2024-12-25 08:30:44.000000',NULL,'Shefound ','SheFound is a non-profit, supporting women entrepreneurs and women-led/owned businesses to grow their businesses and have profitable growth with the aim of accelerating women inclusion and socio-economic empowerment in Tanzania','https://shefound.africa/','3265605d-97c7-4123-8237-d9ca38463e8f.jpeg'),('f65e9ff5-e3e9-4c9b-9fb9-0dbeccb7462e','2024-12-24 14:52:55.147762','2024-12-24 14:53:48.000000',NULL,'Data Lab Tanzania','Tanzania Data Lab (dLab) is a world class data and innovation lab that harnesses the potential of the data revolution and the fourth industrial revolution in solving local, regional, and global sustainable development challenges through data and innovation.','https://dlab.or.tz/','a943ac74-cf23-49b6-b331-f88a034e8a6a.jpeg'),('fc9bd4d8-1c0a-4fc0-a73f-a7f4519ad723','2024-12-25 07:09:08.515335','2024-12-25 07:09:54.000000',NULL,'Meta','Entreprise Informatique specialisée dans les médias sociaux','https://www.meta.com/','e3b59a72-dc11-49d1-8e5f-ee0bd8fe13d9.jpeg'),('fcbef40e-f177-4523-b7d0-ab12c6544497','2024-12-24 08:38:02.718049','2024-12-24 08:38:02.718049',NULL,'VISA Foundation ','La Fondation Visa cherche à soutenir des économies inclusives où les personnes, les entreprises et les communautés peuvent prospérer. En accordant des subventions et en investissant, la Fondation Visa donne la priorité à la croissance de petites et de microentreprises inclusives et diversifiées. La Fondation soutient également les besoins de la communauté élargie et la réponse aux catastrophes en temps de crise. La Fondation Visa est enregistrée aux États-Unis en tant qu’entité 501(c)\n\nhttps://usa.visa.com/sites/visa-foundation.html','https://www.visa.fr/visa/visa-foundation.html',NULL);
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
INSERT INTO `partner_partnerships` VALUES ('01c7753c-4116-45c9-bc09-ef1abc0e31bb','5a87c94c-c587-443a-add4-1c2185df3c16'),('09c1450e-bb10-410d-90f2-184c311e1e27','401c871b-bb56-4818-978c-5c73b64c0028'),('1dc600aa-3604-4567-85c5-0b06be470d29','401c871b-bb56-4818-978c-5c73b64c0028'),('22d828c7-68b6-475b-8bee-1344fead56b7','401c871b-bb56-4818-978c-5c73b64c0028'),('283c7394-e6c2-419a-a321-706c2173e182','401c871b-bb56-4818-978c-5c73b64c0028'),('29e673e2-7817-4028-96e8-31960dfc0ae1','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('3fe870a5-9f3e-4a65-a5a9-7586e7c207c1','401c871b-bb56-4818-978c-5c73b64c0028'),('4496dfd7-01e4-4b58-8d4c-b2aad69695d9','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('491aee3b-ba42-46d0-837d-2c8509bfe030','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('66866d1e-52d3-4ca9-9f05-90a2c3a493f3','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('6964bc7d-956f-49b7-bedc-f4732ff2c000','401c871b-bb56-4818-978c-5c73b64c0028'),('78bd14db-8392-458b-9990-3b7e11de10bc','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('7ce9ec10-1671-44be-b126-1e06b5aea830','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('7fa26551-7746-4169-8d85-d2925b55f2ea','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('81b40f57-f1ad-4412-a37e-70c166dc60e1','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('901f1311-c66e-4cdb-a48c-5edf4e3ebb1f','401c871b-bb56-4818-978c-5c73b64c0028'),('90951633-7455-4085-b415-1c1e9b69fc93','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('97c67216-2866-4dce-bccb-c00c050bcf84','401c871b-bb56-4818-978c-5c73b64c0028'),('a0bec993-eb66-4e52-9095-6961f3fdb27e','401c871b-bb56-4818-978c-5c73b64c0028'),('b8316e7a-244e-40d9-af96-5364839789f2','401c871b-bb56-4818-978c-5c73b64c0028'),('be49080a-f959-41cf-8fe0-2bfe74c7977e','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('c896dba0-6229-4474-854a-e14255aebbff','401c871b-bb56-4818-978c-5c73b64c0028'),('c896dba0-6229-4474-854a-e14255aebbff','7eb4ec6c-e3cd-4814-9d18-65f2154fdb63'),('c896dba0-6229-4474-854a-e14255aebbff','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('c896dba0-6229-4474-854a-e14255aebbff','be3e27d7-e1c5-4ffa-8828-93a0e35f69c9'),('ddf1f46d-c322-4a13-bae5-240a5e7c43d4','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('e5f5166c-81dd-4597-8a43-dcbb0d164a02','401c871b-bb56-4818-978c-5c73b64c0028'),('e9ae7dc7-4e9c-4179-83c2-15c2e16391a4','401c871b-bb56-4818-978c-5c73b64c0028'),('eaab7d0b-f40a-4894-97c9-2c271a0d5b41','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('f1f227d3-5a53-4f88-8b2e-3969061cbabf','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('f65e9ff5-e3e9-4c9b-9fb9-0dbeccb7462e','b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890'),('fc9bd4d8-1c0a-4fc0-a73f-a7f4519ad723','401c871b-bb56-4818-978c-5c73b64c0028'),('fcbef40e-f177-4523-b7d0-ab12c6544497','401c871b-bb56-4818-978c-5c73b64c0028');
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
INSERT INTO `partnership` VALUES ('401c871b-bb56-4818-978c-5c73b64c0028','2024-11-25 14:50:42.728530','2024-11-27 08:28:10.000000',NULL,'Partenaire Financier (Sponsor ou bailleur de fonds)'),('5a87c94c-c587-443a-add4-1c2185df3c16','2024-12-27 08:17:42.492735','2024-12-27 08:17:42.492735',NULL,'Partenaire réseau'),('7eb4ec6c-e3cd-4814-9d18-65f2154fdb63','2024-11-27 08:26:20.374546','2024-11-27 08:29:45.000000',NULL,'Fournisseur de service '),('b5fd8eaf-3fbd-4bc3-bf29-631e75eb0890','2024-11-27 07:33:11.425132','2024-11-27 08:29:22.000000',NULL,'Parternaire de mise en œuvre (Contractant ou consultant)'),('be3e27d7-e1c5-4ffa-8828-93a0e35f69c9','2024-11-27 08:25:58.645304','2024-11-27 08:25:58.645304',NULL,'Echange de service');
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
  `projectId` varchar(36) DEFAULT NULL,
  `form` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`form`)),
  PRIMARY KEY (`id`),
  KEY `FK_ac2930f63ac7178530329b4b219` (`projectId`),
  CONSTRAINT `FK_ac2930f63ac7178530329b4b219` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase`
--

LOCK TABLES `phase` WRITE;
/*!40000 ALTER TABLE `phase` DISABLE KEYS */;
INSERT INTO `phase` VALUES ('06d379f2-d9a9-4d00-8d84-3795b3b05896','2024-12-27 15:13:15.385010','2024-12-27 15:13:15.385010',NULL,'Group & One on One Coaching ','Leadership development \n Leader circle profile \n One on one Coaching ','2024-05-06 00:00:00','2024-11-30 00:00:00',NULL,NULL),('18a97e54-923e-4dbd-8080-2c5fedd5fcbc','2024-12-27 15:11:09.633786','2024-12-27 15:11:09.633786',NULL,'Leadership peer learning & Connection','Connect with peers leaders and discover what is done in their context and build collaborations network','2024-04-27 00:00:00','2024-11-30 00:00:00',NULL,NULL),('3db85a78-c226-4450-b8b5-2b3406b04f06','2024-12-26 11:22:39.189813','2024-12-26 11:22:39.189813',NULL,'Call for Application','Call for Application for qualified profiles','2024-09-02 00:00:00','2024-09-21 00:00:00',NULL,NULL),('53504dcb-2334-47eb-ad42-e6592dd5c595','2024-12-27 15:15:58.017812','2024-12-27 15:15:58.017812',NULL,'Travel & Promotion','- Learning Travel & Conference Attendence\n- Communication & Networking ','2024-08-05 00:00:00','2024-11-29 00:00:00',NULL,NULL),('74bfd4cd-b975-4a72-81b5-75e850daffe3','2024-12-26 11:31:35.018586','2024-12-26 11:31:35.018586',NULL,'Online Master Classes','dSkills@EA ILIMPU 2024 | Online Masterclass: DeepTech Commercialisation & Leveraging Partnerships for Commercialisation','2024-11-04 00:00:00','2025-02-14 00:00:00',NULL,NULL),('8ba689a2-3ebf-4cd6-b17c-e89e4b812552','2024-12-30 09:28:05.630623','2024-12-30 09:28:05.630623',NULL,'Appel à candidature','Appel a candidatures Katalicc cohorte 2','2024-02-05 00:00:00','2024-02-29 00:00:00',NULL,NULL),('8e422946-5545-4bff-bba9-17cffdcede23','2024-11-27 07:39:33.656958','2024-11-27 14:49:40.000000',NULL,'Appel à candidatures','Le programme Mozalisi L\'shi, initié par asbl AFRICALIA vzw et mis en œuvre par Ukamili Digital City, est conçu pour vous accompagner dans votre développement entrepreneurial et créatif à travers :','2024-11-22 00:00:00','2024-12-19 00:00:00',NULL,NULL),('940d2e2e-2994-4cb3-a487-bb18b7c26c89','2024-12-30 09:32:07.801599','2024-12-30 09:32:07.801599',NULL,'Preincubation chez ','Pré-incubation chez les incubateurs (Waza, Khub et Cache)','2024-04-17 00:00:00','2024-04-25 00:00:00',NULL,NULL),('98d5c14b-b054-4ee8-8e10-15a7bc370faf','2024-12-30 09:36:09.474449','2024-12-30 09:36:09.474449',NULL,'Incubation ','Incubation avec Cinolu','2024-05-09 00:00:00','2024-05-23 00:00:00',NULL,NULL),('9abe6566-13f4-4f16-b38b-ccfef76fe058','2024-12-30 10:05:46.573350','2024-12-30 10:05:46.573350',NULL,'pré-incubation','description de la pré-incubation','2025-02-01 00:00:00','2025-02-28 00:00:00',NULL,NULL),('d05ee4f6-3eb5-43a9-b357-8e0e62e3a030','2024-12-30 10:04:49.227950','2024-12-30 10:04:49.227950',NULL,'appel à candidature','Desription de l\'appel à candidature','2024-12-01 00:00:00','2024-12-25 00:00:00',NULL,NULL),('e227ffdb-2dd7-49a6-a2d5-53dd93519981','2024-12-30 09:35:05.790719','2024-12-30 09:35:05.790719',NULL,'Formation de renforcement   creatif','Formation avec Dominique Légitimus','2024-04-30 00:00:00','2024-05-07 00:00:00',NULL,NULL),('ecd71ac0-b7af-4808-a420-a5f38306dc3c','2024-12-26 11:24:40.986930','2024-12-26 11:24:40.986930',NULL,'Selection of applicants','20 candidates are shortlisted from the applicants pool','2024-09-23 00:00:00','2024-10-04 00:00:00',NULL,NULL);
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
INSERT INTO `position` VALUES ('bd94f31e-2164-448d-a9c6-00dff622d2f5','2024-12-20 08:18:06.692097','2024-12-20 08:18:06.692097',NULL,'Software Engeneer','Ingenieur logiciel');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `categoryId` varchar(36) DEFAULT NULL,
  `authorId` varchar(36) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1077d47e0112cad3c16bbcea6cd` (`categoryId`),
  KEY `FK_c6fb082a3114f35d0cc27c518e0` (`authorId`),
  CONSTRAINT `FK_1077d47e0112cad3c16bbcea6cd` FOREIGN KEY (`categoryId`) REFERENCES `blog_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
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
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
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
  `programId` varchar(36) DEFAULT NULL,
  `report` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`report`)),
  PRIMARY KEY (`id`),
  KEY `FK_d4774e6a2f0abb35049d3850e8f` (`programId`),
  CONSTRAINT `FK_d4774e6a2f0abb35049d3850e8f` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('181c50e9-ab24-4963-983b-660ca8bbb94a','2024-12-25 14:22:46.360674','2024-12-27 15:13:34.000000',NULL,'African Visionary Fellowship (AVF)','4c1c5044-361b-463f-a961-030ee8575f4e.jpeg','Since 2017, the Fellowship has offered community, connections, and capacity to stellar proximate leaders of African organizations. African Visionary Fellows receive mentorship, exposure, and the support of a community of like-minded changemakers.\nBeginning in 2017 with a cohort of 25 fellows from eight countries across Sub-Saharan Africa, the African Visionary Fellowship seeks to shift power and agency closer to the beneficiaries of development work. The value proposition for supporting local visionaries is clear and common sense:\nLocal solutions can be more sustainable\nLocal solutions can be more impactful','2024-02-26','2024-12-19','Entrepreneurs d\'impact , entrepreneurs sociaux','\n\nThe fellowship aims to drive more resources to local visionaries and their organizations. Their work will accelerate, and their impact will grow. The AVF offers these leaders capacity building designed for and by local visionaries themselves. Fellows receive mentorship, exposure, and the support of a community of like-minded changemakers. In addition, the fellowship equips each visionary with the ability to accept tax-exempt donations in the U.S. via fiscal sponsorship through our partner One World Children’s Fund.','- Formation \n- Coaching one on one \n- Promotion, connexions ','Pays Africains',1,NULL,NULL),('19111be1-fec3-47d4-b2ca-ed47af55595e','2024-12-25 15:47:40.092642','2024-12-27 15:17:55.000000',NULL,'Smart city Specialisation Program (SCIP)','6d822161-58ef-404f-beb7-421b3d8130db.jpeg','Innovation Support Organizations (ISOs) across Africa often take a generalist approach to supporting startups, lacking strategic focus and specialization in niche sectors. This limits their ability to provide tailored assistance, mentorship, tools and access to partners that tech entrepreneurs need. There is a need to build a collaborative pan-African community of mission-driven, specialized Smart Cities ISOs that can fully support startups to develop innovative solutions for Africa\'s growing cities. To address this gap, the program will select 13 ISOs from Kenya, Uganda, Tanzania, Rwanda, Burundi, Congo, Zambia, Botswana, and South Africa, with at least one organization represented per country. Needs assessments will be conducted for each participating ISO to design a tailored, week-long capacity building bootcamp. The in-person bootcamp will equip ISOs with practical strategies and support them to develop individualized game plans.\n\nCrucially, the program does not end after the bootcamp. To ensure sustainability of outcomes, the ISOs will be supported throughout the duration of the program through peer exchange, individual mentoring sessions, and expert workshops that will facilitate ongoing collaboration and knowledge sharing amongst the ISOs.','2023-08-13','2024-03-14','African ESO/ISO ','The primary goal is to create a regional and interconnected community of ISOs dedicated to supporting Smart Cities startups. The program will provide capacity building, tools and global connections to enable the ISOs to specialize and to position them as go-to ISOs for Smart Cities innovation startups.\n\n','Training bootcamp\nConnexions\nNetworking','Africa ',1,NULL,NULL),('1a432dc7-de02-4b75-9fd4-d6e2e00a3190','2024-12-21 20:28:06.677898','2024-12-30 14:31:14.000000',NULL,'Dskills- Incubation Leadership and Innovation Management Program','0c1fbcdb-a612-422f-b562-d1bba23d05a9.jpeg','The Incubation Leadership and Innovation Management Program aims to equip university students with the skills and knowledge necessary to thrive in entrepreneurial environments. Trainers will play a crucial role in guiding participants through the principles of incubation, innovation management, and effective leadership.','2024-12-15','2024-12-19','Innovation management and incubation leaders in academic hubs \n- Participant : 30','To provide high-quality training that fosters leadership skills and promotes innovative thinking among university students, preparing them to navigate and succeed in dynamic technology transfer and commercialization and entrepreneurial landscapes.','Training, connections with peers','Lubumbashi, Kinshasa , Goma, ',1,NULL,NULL),('23c13017-b7eb-4d01-974b-b4c20bc3ec6d','2024-12-21 21:13:09.179930','2024-12-30 09:49:03.000000',NULL,'L\'impact - Cohorte 2 ','6b02425e-60a7-439b-9538-fa7e82dd6331.png','La première édition de L-Impact montre déjà des résultats très encourageants. Elle a débuté en mars avec un premier module auquel une cinquantaine d’entrepreneurs ont pris part. Suite à cette première semaine, un jury a sélectionné les projets les plus motivés, pertinents et ambitieux pour continuer l’aventure. Le programme dans son ensemble comprend la formation des coaches et un accompagnement de 6 mois constitué de modules intensifs, de coaching personnalisés, de mise à disposition d’une large boîte à outils, d’événements de connexion à l’écosystème et d’une communauté entrepreneuriale énergique! \n\nAu cours de ces modules, les entrepreneurs ont pu, petit à petit et par itérations, construire leur projet sur des bases solides en répondant à des questions essentielles ; Qui est ma cible de quoi a-t-elle besoin ? Est-ce que mon offre répond aux attentes de mes clients ? Quel est le prix le plus adéquat pour mon produit/service ? A quel point mon projet est-il rentable ?, etc. Ils ont appris à écouter le public cible\n','2024-01-07','2024-06-11','Entrepreneurs ','\nL’objectif du programme est d’amener les entrepreneurs le plus loin possible jusqu’à la réalisation de leur première vente/premier contrat. Toutes les activités se sont déroulées dans le cadre idéal du centre hippique de Lubumbashi.\n','Formation, Connexion','Lubumbashi',1,NULL,NULL),('2fbb528e-a97a-49d5-a39b-0fb4feb53a07','2024-12-25 14:52:43.069856','2024-12-27 13:09:24.000000',NULL,'Katalicc cohorte 2','e36e81fa-4c97-400a-a490-222ec260b7b8.jpeg','Le projet Katalicc , l\'Incubateur des Industries Créatives et Curelles offre 3mois d\'incubation des projets assortis d\'une accélération de l\'offre créative','2024-04-16','2024-05-24','Artistes dans l\'audio visuel, la mode ','- Accompagner les entrepreneurs creatifs à structurer leur projet\n- Developper un modèle économique soutainable\n- \n\n','Formation\nCoaching \nFinancement','Lubumbashi, Kolwezi, Likasi',1,NULL,NULL),('3891ca8a-a563-4321-8707-9378761bd4c1','2024-12-24 09:20:30.911786','2024-12-28 15:49:19.000000',NULL,'Revup women  2023 Incubation program','7147f54c-c757-463c-b1c5-2b4a19b8ef75.jpeg','The recent push for gender equality and women’s empowerment over the last 3 decades has led to the emergence of female entrepreneurs and female-led startups on the continent. Research by the World Bank shows that women make up 58% of Africa’s self-employed population and are more likely to become entrepreneurs than men. At 26%, Sub-Saharan Africa is home to the world’s highest percentage of women entrepreneurs – according to the MasterCard Index of Women Entrepreneurs (MIWE) 2021.\n\nYet, according to data from the AfriLabs – Briter Bridges Innovation Ecosystem Report and AfriLabs Needs Assessment report, women-led businesses in Africa continue to face unique challenges that see them perform poorly compared to men-led enterprises. The challenges range from social issues such as challenging social expectations, building a support network, balancing work and family life, and coping with the fear of failure to business-related i','2023-08-06','2023-10-30','Women led early businesses','\nSensitise and mobilise stakeholders to create equal growth opportunities for women-led startups and SMEs through RevUP Women Initiative, leading to inclusive economic growth.\n\nMore funding opportunities for women-led startups and SMEs on the continent.\n\nA profound increase in investable and scalable women-led startups and SMEs in Africa.\n\nMore jobs are created by African women-led startups and SMEs.','- Entreprise development training \n- Acces to finance\n- Mentorship \n- Peer to peer learning','Lubumbashi',1,NULL,NULL),('3e33c468-06ac-41ed-bb43-60eb3af0460d','2024-12-21 20:16:41.381728','2025-01-29 14:55:21.492637',NULL,'AfriStart - RED Start Tunisie','a7ea0b38-0f76-46ff-9dd0-6b97f20ad65b.jpeg','Appel à condidature - Pitch Day- Accéleration et préparation aux missions- 2 missions en RDC et au Kenya- Suivi post et accompagnement post missions','2024-12-17','2026-02-26','- Les startups et PME innovantes tunisiennes, dirigées par des femmes et des jeunes, opérant dans les filières de la Tech\n- Des acteurs tunisiens de l’écosystème de l’exportation, pouvant offrir les services adéquats aux entreprises tunisiennes désirant accéder aux marchés africains','Objectif global: \n\nL’objectif Global de l’initiative est de Favoriser l’intégration commerciale de la Tunisie sur le continent Africain, en renforçant la visibilité des acteurs du secteur de la Tech et en accompagnant l’expansion internationale des startups et PME innovantes vers les marchés africains, favorisant ainsi la création de richesse et d’emploi pour un développement économique inclusif et durable de la Tunisie.\n\nObjectifs specifiques: \n\nFavoriser le développement des synergies entre les acteurs de l’écosystème de l’exportation en Tunisie, en RDC et au Kenya, afin de faciliter les échanges commerciaux et\nde créer un environnement propice à l’expansion des entreprises tunisiennes.\nAccompagner et soutenir le développement à l’international de startups et PME innovantes tunisiennes dans les secteurs de la Tech vers les marchés de la RDC et du Kenya.\n\n','- Reseautage B2B, B2C','Lubumbashi, Kinshasa',1,NULL,NULL),('4955359a-5403-4a0c-913c-8a42869b019f','2024-11-27 09:51:40.385266','2024-12-09 14:58:57.000000',NULL,'Fikiri Sdg','4a9663f6-6b74-4519-9ca7-463378f9e548.jpeg','Programme dédiée à la cartographie, l\'exploration et l\'expérimentation des solutions innovantes locales pour accélérer l\'atteinte des Objectifs de Développement durables .','2023-10-31','2024-01-30','Entrepreneurs','Cartographie des solutions innovantes','Cartographie des solutions innovantes','RDC',1,NULL,NULL),('5dc52ce2-f877-4c09-b1fa-0f07928f97af','2024-12-25 14:56:41.882486','2024-12-27 15:37:27.000000',NULL,'Katalicc - Cohorte 1','437b4d5e-c7ab-4055-89cc-fe7e9b8862d1.jpeg','- incubation de 3 mois','2023-10-15','2024-02-22','Artistes dans l\'audio visuel, la mode et la 3D','- montage et structuration de projets \n','- formation\n- accompagnement\n- financement','Lubumbashi, Kolwezi, Likasi',1,NULL,NULL),('68e60017-a276-4999-b990-158c73bd9cc2','2024-12-24 08:40:18.887238','2024-12-26 18:32:53.000000',NULL,'Revup women 2024- Mentorship ','94c840b1-7f38-4111-8425-b68e50b55680.jpeg','Women-led enterprises in Africa are not receiving enough support\nThe recent push for gender equality and women’s empowerment over the last 3 decades has led to the emergence of female entrepreneurs and female-led startups on the continent. Research by the World Bank shows that women make up 58% of Africa’s self-employed population and are more likely to become entrepreneurs than men. At 26%, Sub-Saharan Africa is home to the world’s highest percentage of women entrepreneurs – according to the MasterCard Index of Women Entrepreneurs (MIWE) 2021.\n\nYet, according to data from the AfriLabs – Briter Bridges Innovation Ecosystem Report and AfriLabs Needs Assessment report, women-led businesses in Africa continue to face unique challenges that see them perform poorly compared to men-led enterprises. The challenges range from social issues such as challenging social expectations, building a support network, balancing work and family life, and coping with the fear of failure to business-related issues like limited access to markets, finance, technology and network.\n\nFind out more at https://revupwomen.com/','2024-03-10','2024-12-30','Revup women - Lubumbashi Finalist mentorship ','- Support growth and access to enabling capital $10k USD \n','-Enterprise Development Training\n-Mentorship\n-Peer-To-Peer Learning Workshops\n-Funding through Catalytic Africa','Lubumbashi',1,NULL,NULL),('7f4eaff5-7acc-43e8-a725-e2125d5f10b2','2024-12-24 13:05:38.200942','2024-12-26 18:09:10.000000',NULL,'Seedstars EWA  Hub Mentoring','3be2636c-f278-489d-b67c-47ba04b3adae.jpeg','Women entrepreneurs face multiple challenges to accessing finance, with an estimated $42 billion financing gap for African women across business value chains. According to the United Nations’ Global Entrepreneurship Monitor study, around 56% of women entrepreneurs in Sub-Saharan Africa cite either unprofitability or lack of finances as a reason for closing down their businesses.\n\nEWEA determined some of the biggest obstacles women face in business include a lack of an enabling environment for women businesses to grow their skills, thrive, and rise to management positions. Nevertheless, in terms of potential, they are as efficient and growth-oriented as male-owned businesses.\nThrough a collaboration with the African Development Bank’s AFAWA initiative and GrowthAfrica, the EWEA program is set to provide long-term and scalable capacity building, access to mentorship, access to funding, and access to visibility for both WSMEs and community enablers in Cameroon, Democratic Republic of Congo, Kenya, Malawi, Morocco, Mozambique, Senegal, South Africa, Tanzania, Rwanda, and Zambia.','2024-07-07','2024-12-12','Enabler beneficiaries are understood to be entrepreneur support organizations that are any of the following:\n\nGroups that exclusively support WSMEs,\nOrganizations that have a mix of women-dedicated and gender-agnostic activities,\nGender-agnostic ESOs that want to expand their capacity to support WSMEs.\nParticipating organizations will be given access to mentorship, workshops, and a capacity-building program through the Seedstars Online Academy.','The objective of the Project is to address gender inequality and inclusive economic empowerment for African women. Specifically, the Project aims at increasing the capacity and sustainability of enablers supporting Women-led Small and Medium Enterprises (WSMEs), as well as increase access to mentorship, funding and visibility for WSMEs.','- Capacity building\n- WSMEs inclusive Program design','Lubumbashi',1,NULL,NULL),('8303b6c6-a3be-4e8f-918b-fe95cd026f83','2024-12-28 16:01:08.761715','2024-12-28 16:01:08.761715',NULL,'Afrilabs Capacity Building  2023 - Physical workshop',NULL,'\n- Formation gestion des hubs d\'innovation\n- Mentorat\n- Atelier d\'echange','2023-05-10','2023-05-12','Hubs within central Africa Region','- Renforcer les capacites des hubs membres et non membre d\'Afrilabs en Afrique centrale','- Formation gestion des hubs d\'innovation\n- Mentorat\n- Atelier d\'echange\n','Lubumbashi',0,NULL,NULL),('8a5ccf42-040a-4d0e-9a5f-16bf60573076','2024-12-21 21:26:29.852869','2025-01-29 14:55:03.757809',NULL,'L\'impact Saison 3 by Sopa+','1196a6ef-6c8f-4774-82f8-420fba0e5fc2.jpeg','The Stop Online Piracy Act (SOPA) had a significant potential impact on the internet by allowing for the removal of websites that hosted or linked to copyrighted material considered infringing, even if only a small portion of the site was involved, leading to concerns about censorship, stifling innovation, and harming legitimate online businesses due to its broad and potentially overreaching measures.','2024-12-15','2025-06-26','projets durables','Accompagnement de l\'idée au Market Fit du Produit','Incubation \nConnexions Marché','Lubumbashi',1,NULL,NULL),('953fc227-b13b-41a7-9b6c-f36566945cb8','2024-12-21 20:52:58.998701','2024-12-30 13:45:59.000000',NULL,'Dskills - Sprint up program','dadd512c-c870-43d7-8cb5-2c93c4e3e07f.jpeg','The Digital Innovations for Business Resilience in the EAC – Innovators Sprint up Programme” is part of the East African Community (EAC) project, “Digital Skills for an Innovative East African Industry” (dSkills@EA) implemented by the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) and the Inter University Council for East Africa (IUCEA) across all EAC Partner States. The project focuses on strengthening academia-industry collaboration in digital skills training and innovation transfer to improve the uptake of digital skills and innovations by the industry in the region.\n\nThe Innovators Sprint Up programme is being implemented (under the dSkills@EA project with the support of) by the Association of Startups and SMEs Enablers of Kenya (ASSEK) in a consortium of innovator Support Organizations (ESOs) that includes: E4Impact Foundation, Ennovate Ventures, Aclis, Koneta Hub and Cinolu Hub, on behalf of GIZ and IUCEA.\n','2024-07-31','2024-10-30','University  students\n\nKPI \nParticipation : (Total : 30)\n\nImpact ( Total : 15 Demo day Finalists, 2 in Regional study tour)  ','The overall objective of this assignment is to train and equip young innovators and budding innovators at universities across the seven EAC Partner States (Burundi, Kenya, DR Congo, Rwanda, South Sudan, Tanzania and Uganda), to establish sustainable business models, gain access to knowledge and tools needed to operate and scale up their Startup ventures.\nThe innovator has applied for and has been accepted into the Programme.\n','Training and incubation','Lubumbashi, Kinshasa , Goma, Bukavu, Kisangani',1,NULL,NULL),('994e2ca2-fdd4-447d-bce1-00776c9d826d','2024-12-21 22:57:54.381761','2024-12-30 09:13:46.000000',NULL,'Afrilabs Atelier Regional Hybride 2024','bce4ed33-48f7-451d-ada7-0ddc24c7e4cf.jpeg','3 journées consacrees à:\nFormation des hubs managers\nMeetup et connexions des pairs\nTour Ecosysteme\n','2024-07-23','2024-07-25','Hubs d\'innovation Afrique centrale','Renforcer les capacités des structures d\'accompagnement','Formation; connexions','Lubumbashi',1,NULL,NULL),('bd53ce02-0fa3-4e5d-a88a-86ec2e194977','2024-11-25 15:06:42.837268','2025-01-29 15:52:51.150133',NULL,'Mozalisi Lubumbashi','4ccce655-4480-4b1b-9cca-f2912cac9f25.jpeg','Un programme d’entrepreneuriat à l’initiative d’Africalia et déployépar Ukamili Digital City et Africalia. Il vise à consolider les entreprises luchoisesévoluant dans les industries culturelles et créatives (ICC), dont les secteurs d’activitéont pour objet principal la création, le développement, la production, la reproduction,la promotion, la diffusion ou la commercialisation de biens, de services et activités quiont un contenu culturel, artistique et/ou patrimonial.','2024-11-24','2025-11-24','Les entrepreneur.e.s luchois.es qui opèrent dans le secteur culturel et\ncréatif et qui génèrent des revenus grâce à leur activité économique (produit ou\nservice), mais dont la gestion et la stratégie entrepreneuriale et opérationnelle\nnécessitent encore des ajustements.','Accompagner des jeunes entreprises du secteur culturel\net créatif dans la consolidation et la croissance de leur activité entrepreneuriale','Un parcours d’incubation composé de modules de formation et d’un suivi\nsur mesure sous forme de business coaching et de mentorat créatif, renforçant les\nentreprises tant au niveau des capacités de gestion entrepreneuriale que sur le plan\ncréatif et culturel.','Lubumbashi, RDC',1,NULL,NULL),('c88423f3-0d2a-46c3-afe0-bc24bb3314dc','2024-12-25 13:59:05.171273','2024-12-27 15:24:41.000000',NULL,'SAMU ','091efef8-a09c-4ebe-96db-6929d94c8a1f.jpeg','Montage de projet\nDeveloppement d\'entreprise\nMentorat one on one','2024-03-21','2024-05-09','SAMU ','- Montage de projet \n- Elaborer le business modele de l\'entreprise\n- Business plan','Coaching & mentorat','Goma, Bukavu',1,NULL,NULL),('d2c13dbf-0db8-478c-9002-d5b3ba3e47e6','2024-11-27 09:45:53.617176','2025-01-01 13:34:09.000000',NULL,'Binti Share','5be15ff1-102b-439e-bb6e-a96030a2f9e9.jpeg','Le programme s\'articule autour de 3 thématiques/ industries  clés ou les femmes foisonnent en 2024  et d\'un focus group\n\n\nATELIER 1 : 1er Février 2024\nFormat : En ligne sur Zoom\nThème : EDUCATION ET FORMATION\n1. Discuter de défis liés à l\'éducation et la formation des femmes en entrepreneuriat et\nidentifier des moyens de renforcer leur accès à ces ressources\n2. La vision et les objectifs des femmes entrepreneures : Comprendre comment les femmes\nentrepreneures définissent leur succès et leurs objectifs afin de mieux comprendre pourquoi\nleurs entreprises demeurent à petite échelle.\nGuests : Afin de comprendre le niveau d’implication et de participation des femmes aux formations,\nnous avons ciblé 2 guests qui pourront nous parler des difficultés qu’elles rencontrent en tant\nqu’organisation\n1. Mme Yaya Ntema, Centre de formation Lugo farm\n2. Kileshe Kasoma pour le compte de Ocademy\nMobilisation : exploiter le réseau des femmes revup ( lubumbashi,kinshasa, cameroun), et les\nfemmes de l’écosystème.\nATELIER 2 : 7 février 2024\nFormat : En ligne, sur Zoom\nThème : ACCES AU FINANCEMENT\nLes défis rencontrés par les femmes entrepreneurs dans l\'accès au financement et aux ressources :\ncet échange va porter sur les obstacles spécifiques auxquels les femmes sont confrontées lorsqu\'elles\ncherchent à obtenir un financement pour leur entreprise, ainsi que sur les solutions possibles pour\ncombler ces fossés.\nGuest : Afin de comprendre le niveau d’implication et de participation des femmes aux programmes\nde financement et les fossés observés, nous avons ciblé Smico, qui pourra nous parler de leur\nconstat.\nATELIER 3 : 15 février 2024\nFormat : En ligne, sur Zoom\nThème : LEADERSHIP\n1. Leadership féminin : explorer les défis auxquels les femmes sont confrontées en tant que\nleaders d\'entreprise et discuter des moyens de promouvoir leur leadership et leur\nreprésentation.\n2. La sous-représentation des femmes dans les postes de direction et de prise de décision :\ncette discussion va se concentrer sur la manière dont les stéréotypes de genre et les\n\nbarrières sociétales limitent l\'accès des femmes à des rôles de leadership dans le secteur\nentrepreneurial, et sur les stratégies pour promouvoir une plus grande égalité des chances.\n3. Équilibre travail-vie personnelle : discuter des défis liés à l\'équilibre entre la vie\nprofessionnelle et la vie personnelle pour les femmes entrepreneures et partager des\nstratégies pour y faire face.','2024-01-31','2024-02-27','Femmes','-  Créer une plateforme ou les femmes se connecte , partage leurs expériences et trouvent des solutions aux problemes qu\'elles rencontrent\n-  Offrir des outils et des ressources pour surmonter les défis du genre\n-  Discuter des roles et de besoins specifiques les Structure de soutien à l\'innovation et à l\'entreprenariat pour surmonter les défis de maniere perainne\n-   ','- Networking \n- Capacity Building','Lubumbashi',1,NULL,NULL),('e950d0a2-aafc-4038-818a-50dc3b179090','2024-12-31 15:30:48.212935','2024-12-31 15:47:33.000000',NULL,'Global Startup Awards - Africa 2024','4b1bc9f7-f8ed-449e-a483-9eae761d528e.jpeg','The Global Startup Awards bring together high impact startups and investors from over 100 countries across the globe. The network offers participants the opportunity to meet prospective mentors, partners, clients, and gain access to the latest industry trends.\n\nThe competition process also brings together local ambassadors, country partners, national jury members, international jury members as well as key advisors to discover winners in all aspects of the startup ecosystem.\n\nThe Global Innovation Initiative Group (GIIG) exists to Find, Fund and grow innovation in Africa. GIIG is the exclusive rights holder to the Global Startup Awards Africa, serving as a scouting vehicle to discover entrepreneurs across all sectors in Africa.\n\nThe GIIG Africa Fund is a unique profit and purpose fund that invests in world-changing technologies. The GIIG Africa Foundation pairs African innovators with the right skills & strategies and connects them to global partners for scale.\n\nFind out More https://www.globalstartupawardsafrica.com/','2024-01-07','2024-11-21','- Startups \n- ESos & ISOS including incubators, accelerators, coworking spaces','- Mobilise country best innovators and  actors to partake the compition\n- Disseminate information about the competition \n','The African Startup Awards connects the best of African tech startups across the continent to a global network of leading investors and innovation ecosystems. The African Startup Awards will offer startups access to:\n\nNew Markets\n\nFunding Opportunities\n\nA Global Network Of Leaders\n\nExposure On A Global Stage','Lubumbashi, Kinshasa , Goma, Bukavu, Kisangani',1,NULL,NULL),('f5a608e1-d3d1-4e56-9546-38d2df50c2a5','2024-11-26 13:23:26.425836','2024-12-27 15:46:23.000000',NULL,'L\'Impact Saison 1','2e7884b7-582b-4bcb-9e57-c42933e40fcc.jpeg','L-Impact est un programme d\'incubation collectif, immersif et intensif de 6 mois avec des coaches locaux et internationaux spécialisés dans l\'entrepreneuriat.','2023-12-20','2024-03-30','Entrepreneurs','Incubation des projets','Incubation des projets','Lubumbashi',1,NULL,NULL);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_categories`
--

DROP TABLE IF EXISTS `project_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_categories` (
  `projectId` varchar(36) NOT NULL,
  `categoryId` varchar(36) NOT NULL,
  PRIMARY KEY (`projectId`,`categoryId`),
  KEY `IDX_4b3ae99beef33e732fb6318500` (`projectId`),
  KEY `IDX_1c3ef809362ea005697d86e828` (`categoryId`),
  CONSTRAINT `FK_1c3ef809362ea005697d86e8288` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_4b3ae99beef33e732fb63185009` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_categories`
--

LOCK TABLES `project_categories` WRITE;
/*!40000 ALTER TABLE `project_categories` DISABLE KEYS */;
INSERT INTO `project_categories` VALUES ('181c50e9-ab24-4963-983b-660ca8bbb94a','2648efb9-b991-41c0-ac23-f00c8064c4e2'),('19111be1-fec3-47d4-b2ca-ed47af55595e','2648efb9-b991-41c0-ac23-f00c8064c4e2'),('1a432dc7-de02-4b75-9fd4-d6e2e00a3190','cbf9b12a-dd6a-4af7-beba-4dea06c04df9'),('23c13017-b7eb-4d01-974b-b4c20bc3ec6d','f1008777-0b00-46e2-b8c8-179855c912e7'),('2fbb528e-a97a-49d5-a39b-0fb4feb53a07','4dc9d410-a70f-4607-a8f9-50dfba942d9a'),('3891ca8a-a563-4321-8707-9378761bd4c1','4dc9d410-a70f-4607-a8f9-50dfba942d9a'),('3e33c468-06ac-41ed-bb43-60eb3af0460d','f1008777-0b00-46e2-b8c8-179855c912e7'),('4955359a-5403-4a0c-913c-8a42869b019f','08421668-9083-41e3-9a23-932ebbb1d03c'),('5dc52ce2-f877-4c09-b1fa-0f07928f97af','4dc9d410-a70f-4607-a8f9-50dfba942d9a'),('68e60017-a276-4999-b990-158c73bd9cc2','08421668-9083-41e3-9a23-932ebbb1d03c'),('7f4eaff5-7acc-43e8-a725-e2125d5f10b2','f1008777-0b00-46e2-b8c8-179855c912e7'),('8303b6c6-a3be-4e8f-918b-fe95cd026f83','f1008777-0b00-46e2-b8c8-179855c912e7'),('8a5ccf42-040a-4d0e-9a5f-16bf60573076','f1008777-0b00-46e2-b8c8-179855c912e7'),('953fc227-b13b-41a7-9b6c-f36566945cb8','f1008777-0b00-46e2-b8c8-179855c912e7'),('994e2ca2-fdd4-447d-bce1-00776c9d826d','4dc9d410-a70f-4607-a8f9-50dfba942d9a'),('994e2ca2-fdd4-447d-bce1-00776c9d826d','f1008777-0b00-46e2-b8c8-179855c912e7'),('bd53ce02-0fa3-4e5d-a88a-86ec2e194977','f1008777-0b00-46e2-b8c8-179855c912e7'),('c88423f3-0d2a-46c3-afe0-bc24bb3314dc','4dc9d410-a70f-4607-a8f9-50dfba942d9a'),('d2c13dbf-0db8-478c-9002-d5b3ba3e47e6','f1008777-0b00-46e2-b8c8-179855c912e7'),('e950d0a2-aafc-4038-818a-50dc3b179090','4dc9d410-a70f-4607-a8f9-50dfba942d9a'),('f5a608e1-d3d1-4e56-9546-38d2df50c2a5','f1008777-0b00-46e2-b8c8-179855c912e7');
/*!40000 ALTER TABLE `project_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_partners`
--

DROP TABLE IF EXISTS `project_partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_partners` (
  `projectId` varchar(36) NOT NULL,
  `partnerId` varchar(36) NOT NULL,
  PRIMARY KEY (`projectId`,`partnerId`),
  KEY `IDX_e5f58061b5ae1744551d31fa34` (`projectId`),
  KEY `IDX_7896bef40d92e726aeff1e2c8c` (`partnerId`),
  CONSTRAINT `FK_7896bef40d92e726aeff1e2c8cf` FOREIGN KEY (`partnerId`) REFERENCES `partner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e5f58061b5ae1744551d31fa34e` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_partners`
--

LOCK TABLES `project_partners` WRITE;
/*!40000 ALTER TABLE `project_partners` DISABLE KEYS */;
INSERT INTO `project_partners` VALUES ('181c50e9-ab24-4963-983b-660ca8bbb94a','a0bec993-eb66-4e52-9095-6961f3fdb27e'),('19111be1-fec3-47d4-b2ca-ed47af55595e','c896dba0-6229-4474-854a-e14255aebbff'),('1a432dc7-de02-4b75-9fd4-d6e2e00a3190','c896dba0-6229-4474-854a-e14255aebbff'),('23c13017-b7eb-4d01-974b-b4c20bc3ec6d','78bd14db-8392-458b-9990-3b7e11de10bc'),('23c13017-b7eb-4d01-974b-b4c20bc3ec6d','901f1311-c66e-4cdb-a48c-5edf4e3ebb1f'),('23c13017-b7eb-4d01-974b-b4c20bc3ec6d','e5f5166c-81dd-4597-8a43-dcbb0d164a02'),('2fbb528e-a97a-49d5-a39b-0fb4feb53a07','22d828c7-68b6-475b-8bee-1344fead56b7'),('2fbb528e-a97a-49d5-a39b-0fb4feb53a07','4496dfd7-01e4-4b58-8d4c-b2aad69695d9'),('2fbb528e-a97a-49d5-a39b-0fb4feb53a07','c896dba0-6229-4474-854a-e14255aebbff'),('3891ca8a-a563-4321-8707-9378761bd4c1','6964bc7d-956f-49b7-bedc-f4732ff2c000'),('3891ca8a-a563-4321-8707-9378761bd4c1','c896dba0-6229-4474-854a-e14255aebbff'),('3891ca8a-a563-4321-8707-9378761bd4c1','fcbef40e-f177-4523-b7d0-ab12c6544497'),('3e33c468-06ac-41ed-bb43-60eb3af0460d','c896dba0-6229-4474-854a-e14255aebbff'),('5dc52ce2-f877-4c09-b1fa-0f07928f97af','22d828c7-68b6-475b-8bee-1344fead56b7'),('68e60017-a276-4999-b990-158c73bd9cc2','6964bc7d-956f-49b7-bedc-f4732ff2c000'),('68e60017-a276-4999-b990-158c73bd9cc2','c896dba0-6229-4474-854a-e14255aebbff'),('68e60017-a276-4999-b990-158c73bd9cc2','fcbef40e-f177-4523-b7d0-ab12c6544497'),('7f4eaff5-7acc-43e8-a725-e2125d5f10b2','c896dba0-6229-4474-854a-e14255aebbff'),('8303b6c6-a3be-4e8f-918b-fe95cd026f83','b8316e7a-244e-40d9-af96-5364839789f2'),('8a5ccf42-040a-4d0e-9a5f-16bf60573076','1dc600aa-3604-4567-85c5-0b06be470d29'),('953fc227-b13b-41a7-9b6c-f36566945cb8','c896dba0-6229-4474-854a-e14255aebbff'),('994e2ca2-fdd4-447d-bce1-00776c9d826d','1dc600aa-3604-4567-85c5-0b06be470d29'),('994e2ca2-fdd4-447d-bce1-00776c9d826d','66866d1e-52d3-4ca9-9f05-90a2c3a493f3'),('994e2ca2-fdd4-447d-bce1-00776c9d826d','b8316e7a-244e-40d9-af96-5364839789f2'),('994e2ca2-fdd4-447d-bce1-00776c9d826d','c896dba0-6229-4474-854a-e14255aebbff'),('bd53ce02-0fa3-4e5d-a88a-86ec2e194977','09c1450e-bb10-410d-90f2-184c311e1e27'),('c88423f3-0d2a-46c3-afe0-bc24bb3314dc','901f1311-c66e-4cdb-a48c-5edf4e3ebb1f'),('d2c13dbf-0db8-478c-9002-d5b3ba3e47e6','1dc600aa-3604-4567-85c5-0b06be470d29'),('d2c13dbf-0db8-478c-9002-d5b3ba3e47e6','6964bc7d-956f-49b7-bedc-f4732ff2c000'),('e950d0a2-aafc-4038-818a-50dc3b179090','29e673e2-7817-4028-96e8-31960dfc0ae1'),('f5a608e1-d3d1-4e56-9546-38d2df50c2a5','901f1311-c66e-4cdb-a48c-5edf4e3ebb1f'),('f5a608e1-d3d1-4e56-9546-38d2df50c2a5','e5f5166c-81dd-4597-8a43-dcbb0d164a02');
/*!40000 ALTER TABLE `project_partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_types`
--

DROP TABLE IF EXISTS `project_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_types` (
  `projectId` varchar(36) NOT NULL,
  `typeId` varchar(36) NOT NULL,
  PRIMARY KEY (`projectId`,`typeId`),
  KEY `IDX_6feefc140a5a0b09c1a04e40ce` (`projectId`),
  KEY `IDX_0b6574c50cd3be60fd2586d167` (`typeId`),
  CONSTRAINT `FK_0b6574c50cd3be60fd2586d167f` FOREIGN KEY (`typeId`) REFERENCES `type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_6feefc140a5a0b09c1a04e40ce7` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_types`
--

LOCK TABLES `project_types` WRITE;
/*!40000 ALTER TABLE `project_types` DISABLE KEYS */;
INSERT INTO `project_types` VALUES ('181c50e9-ab24-4963-983b-660ca8bbb94a','f3748e58-e7e7-4197-bcf8-4ec35c005b51'),('19111be1-fec3-47d4-b2ca-ed47af55595e','f3748e58-e7e7-4197-bcf8-4ec35c005b51'),('1a432dc7-de02-4b75-9fd4-d6e2e00a3190','2cfa6302-4f1a-417a-b524-c64683d9e054'),('23c13017-b7eb-4d01-974b-b4c20bc3ec6d','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('2fbb528e-a97a-49d5-a39b-0fb4feb53a07','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('3891ca8a-a563-4321-8707-9378761bd4c1','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('3e33c468-06ac-41ed-bb43-60eb3af0460d','2cfa6302-4f1a-417a-b524-c64683d9e054'),('3e33c468-06ac-41ed-bb43-60eb3af0460d','3a7aa2bc-83a5-4edd-9358-1b2aa882980f'),('3e33c468-06ac-41ed-bb43-60eb3af0460d','5ec94159-38c8-4dfc-88f3-c9ca3db24a0a'),('4955359a-5403-4a0c-913c-8a42869b019f','9187f52f-d70f-412e-a041-99befd5a281f'),('5dc52ce2-f877-4c09-b1fa-0f07928f97af','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('68e60017-a276-4999-b990-158c73bd9cc2','f3748e58-e7e7-4197-bcf8-4ec35c005b51'),('7f4eaff5-7acc-43e8-a725-e2125d5f10b2','1a08081c-641b-40ce-9282-eaef2f155f75'),('8303b6c6-a3be-4e8f-918b-fe95cd026f83','1a08081c-641b-40ce-9282-eaef2f155f75'),('8a5ccf42-040a-4d0e-9a5f-16bf60573076','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('953fc227-b13b-41a7-9b6c-f36566945cb8','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('994e2ca2-fdd4-447d-bce1-00776c9d826d','1a08081c-641b-40ce-9282-eaef2f155f75'),('994e2ca2-fdd4-447d-bce1-00776c9d826d','875e69b8-9350-4c7d-8a45-527555e5bcd0'),('bd53ce02-0fa3-4e5d-a88a-86ec2e194977','f56b7f4c-948b-422f-8865-15b4dd8fb04b'),('c88423f3-0d2a-46c3-afe0-bc24bb3314dc','f3748e58-e7e7-4197-bcf8-4ec35c005b51'),('d2c13dbf-0db8-478c-9002-d5b3ba3e47e6','36053972-ba73-46f6-9132-b5fa6a573905'),('e950d0a2-aafc-4038-818a-50dc3b179090','36053972-ba73-46f6-9132-b5fa6a573905'),('f5a608e1-d3d1-4e56-9546-38d2df50c2a5','f56b7f4c-948b-422f-8865-15b4dd8fb04b');
/*!40000 ALTER TABLE `project_types` ENABLE KEYS */;
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
INSERT INTO `type` VALUES ('1a08081c-641b-40ce-9282-eaef2f155f75','2024-12-24 09:36:37.446688','2025-01-01 13:31:44.000000',NULL,'Renforcement de  Capacité - SAEI','Renforcement des structures d\'accompagnement à l\'innovation et l\'entreprenariat'),('25be7444-0b9a-48ff-9c24-f467bbff71ce','2024-12-23 10:55:50.654390','2024-12-25 14:56:58.000000',NULL,'Accélération ','Acceleration de projets'),('2cfa6302-4f1a-417a-b524-c64683d9e054','2024-11-27 08:12:46.008298','2024-12-24 06:57:23.000000',NULL,'Bootcamp (Sprint)','Atelier, Formation accélerée et intensive '),('34110766-cc39-4fbb-b549-b04c2ffc6267','2024-12-24 09:35:48.914091','2024-12-24 09:36:57.000000','2024-12-24 09:36:57.000000','Voyage d\'Affaire ','Voyage d\'immersion, visite '),('36053972-ba73-46f6-9132-b5fa6a573905','2024-12-31 15:28:07.178565','2025-01-01 13:29:03.000000',NULL,'Promotion & Sensibilisation (Reach out)','Promotion écosystème'),('3a7aa2bc-83a5-4edd-9358-1b2aa882980f','2024-11-27 08:18:44.481708','2024-12-24 09:35:04.000000',NULL,'Réseautage','Mise en relation des innovateurs et des entrepreneurs avec les acteurs, les partenaires et les clients disponibles dans l\'écosystème '),('5ec94159-38c8-4dfc-88f3-c9ca3db24a0a','2024-11-27 08:11:01.672940','2024-11-27 08:11:01.672940',NULL,'Speed dating','Connexion aux investisseurs '),('6e0fcdeb-bc98-420b-9323-7e7f5c98096b','2024-12-23 10:49:37.543950','2024-12-24 09:37:36.000000',NULL,'Stage d\'immersion','Residence , Voyage et Immersion'),('727994d7-04a8-4b07-ae71-062df7bead4c','2024-12-24 09:57:19.525571','2024-12-24 09:57:19.525571',NULL,'Meetup','Atelier d\'echanges et rencontres'),('875e69b8-9350-4c7d-8a45-527555e5bcd0','2024-12-21 22:52:59.706597','2024-12-21 22:52:59.706597',NULL,'Conférence','Conference et panel'),('8c9d60fa-7c40-4be7-9927-f397fdd16975','2025-01-01 13:30:14.671007','2025-01-01 13:30:14.671007',NULL,'Renforcement de  Capacité - Startups & PME','Renforcement de  Capacité - Startups & PME'),('9187f52f-d70f-412e-a041-99befd5a281f','2024-11-27 08:16:32.498182','2024-12-23 10:51:36.000000',NULL,'Cartographie (Mapping)','Identification et promotion des acteurs et des initiatives dans l\'écosystème (secteur, industrie ou marché)'),('ab46426c-10aa-4f81-adb4-b1853666cc25','2024-12-24 09:32:57.214882','2024-12-24 09:34:12.000000',NULL,'Business Consulting ','Consultance  et conseil de developpement d\'entreprise post incubation/Acceleration'),('eadfcad1-0913-4496-86ce-d4ffd272608f','2024-12-24 09:55:56.779829','2024-12-24 09:55:56.779829',NULL,'Town Hall ( Playdoyer)','Town Hall - Playdoyer et sensibilisation ecosyteme'),('f2024bbf-5151-439f-ba3c-7f625bb12edd','2024-12-23 10:50:13.731746','2024-12-23 10:50:13.731746',NULL,'Camp d\'innovation','Camp d\'innovation'),('f3748e58-e7e7-4197-bcf8-4ec35c005b51','2024-11-27 08:10:17.170445','2024-12-24 09:33:35.000000',NULL,'Mentorat','Programme de  coaching et mentorat'),('f56b7f4c-948b-422f-8865-15b4dd8fb04b','2024-11-25 14:43:45.931496','2024-12-25 14:57:18.000000',NULL,'Incubation ','Programme dédié à l\'accompagnement des startups,pme et porteurs de projets, offrant mentorat, formation, accès aux ressources et opportunités pour développer et accélérer leur croissance.');
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
INSERT INTO `user` VALUES ('08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10','2024-12-03 13:11:05.516890','2024-12-03 14:16:27.000000',NULL,'josuev@cinolu.org','Josué Vangu','$2b$10$qSU1YG3pq.MBO0GHDSucVewtpHOBIyAagmtzLTkNLudWkYnesiX6K','+243812656895','Lubumbashi, RDC',NULL,'6c8bf66a-ee64-48b1-bc30-0d5c4a55f321.webp','2024-12-03 13:11:05',NULL),('13d2aaea-4c0e-425c-b458-d7320846c3df','2024-12-03 13:36:32.534049','2024-12-03 13:37:38.000000',NULL,'wilfriedm@cinolu.org',' Wilfried Musanzi ','$2b$10$QUyNYuO7fw8WiLhwGXOh1.xYnhAUe6xo9wAlQ7yA0VVflpzr9Pt.S','+243979265726','Lubumbashi, RDC',NULL,'f252e7d9-63be-4e87-af60-c5bc0f8b2e45.webp','2024-12-03 13:36:32',NULL),('14b71c63-5705-418f-8ad5-3c5d9641dcc7','2024-12-27 23:02:05.914452','2024-12-27 23:02:05.914452',NULL,'mayaladonnel8@gmail.com','Donel Mayala',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocIBe16yiYkUlPaH3QDqm3Jq7aXVPqVbp1tt3NtOqC1svBQmd3iM=s96-c',NULL,'2024-12-27 23:02:05',NULL),('2579128b-393d-47bb-9cdc-cad1b581e3f6','2024-12-18 14:28:52.037221','2024-12-18 14:30:10.000000',NULL,'dorachmuss38@gmail.com','DORACH MUSOKA ','$2b$10$D0vBzj6tBpTjcxKnt28r.uUntjzjESzeR1TWl7TpcEkaJVBSw9rBC','+243 848407654','Lubumbashi RDC',NULL,NULL,'2024-12-18 14:30:10',NULL),('282dbbe7-bd29-4c19-803f-45d08caee861','2024-12-03 13:27:07.500584','2024-12-03 13:37:19.000000',NULL,'moisez@cinolu.org',' Moses KALUNGA ','$2b$10$0jOmOsXAsoigwmETwU4WQOt/U8M0S9VkP52CvA86VcEK7ENE0X5QS','+243992422969','Lubumbashi, RDC',NULL,'bebe676c-4649-4e88-845a-f76d093364e2.webp','2024-12-03 13:27:07',NULL),('30ec1712-09d7-47b7-a633-3849b3e98827','2024-11-25 14:05:55.711163','2024-12-06 16:26:29.000000',NULL,'admin@admin.com','Admin','$2b$10$vKNuRyTUQP06w0Z6lHyg2./A98.hsVdH1Kl0csGZ6Y3TxzpSez4Z6','445.423.2388 x0419','2349 Trantow Crescent',NULL,NULL,'2024-11-25 01:23:45','47533df2-0614-4f5b-9ebd-35a2e08c8c98'),('41aaaed0-fcbe-4404-be65-d3c4bd01d8cb','2024-11-28 08:36:12.044157','2024-12-02 13:41:42.000000',NULL,'joycem@cinolu.org','Joyce Mishika','$2b$10$31Na5YaKdkBSCtmQupPLKOjfEYUJquynTjOh3zf8PHroS3RV4/lGO','+243824263063','Lubumbashi, RDC',NULL,'54826be0-7e69-4751-947f-c0a489d4f8eb.webp','2024-11-28 08:36:11',NULL),('66472167-02a5-4737-a57f-392ccb029294','2024-12-25 03:13:21.405511','2024-12-25 04:15:45.000000',NULL,'michelkabongobis@gmail.com','Ir Michel KABONGO BISUAYA ','$2b$10$y1KhULXja1LEwNW2ZqpNhuQz6cv9B8/C0cgF0FCtRGx3rZumISGI6','+243992492999','16,Av.Prof.Dr.Lunkamba,Q.Mille Collines,C.Annexes',NULL,'62295544-c3c7-476e-a3cf-6c7d9719fa04.jpeg','2024-12-25 03:14:52',NULL),('69d37916-e408-4d78-bc6a-7cbfe6e5132b','2024-11-28 08:41:14.844643','2024-12-03 08:16:36.000000',NULL,'compta@cinolu.org','Dave Ilunga ','$2b$10$UA2RqheHe9c28d9TM7hSd.04U6L0zq7SmOvG1q2Lww2uHbjzzgqnC','+243898579885','Lubumbashi, RDC',NULL,'5966e1fa-b801-4bca-9ecc-240a98625696.jpeg','2024-11-28 08:41:14',NULL),('71368b8a-5b12-4638-86a3-760d2310fcae','2024-11-28 08:49:15.449854','2024-12-03 13:21:17.000000',NULL,'lydias@cinolu.org','Lydia Saku','$2b$10$pM4NZBXHuK1vBZHvQH3VpOimXR82v.9dDaTIH8EXuq3bVwq75PSim','+243821512898','Lubumbashi, RDC',NULL,'a43a1860-5dd3-456b-940a-8fdfaa62e0bc.webp','2024-11-28 08:49:15',NULL),('80f283ff-0239-4db1-8678-762bd6ca5689','2024-11-28 08:51:52.016057','2024-12-02 13:36:48.000000',NULL,'rodriguezm@cinolu.org','Rodriguez Monga','$2b$10$4gWW8f9NWEHwia6jP/sSc.UecM7maN0AQUUJgZUnGIgNHxjX2hdZ.','+2439907240951','Lubumbashi, RDC',NULL,'babacbfb-9934-49e3-8078-13ccf54e7611.webp','2024-11-28 08:51:51',NULL),('958b40c2-1d1c-4a4e-a128-276490827264','2024-12-01 10:29:55.687097','2024-12-14 07:12:32.000000',NULL,'mukengeshayisymphorien@gmail.com','MUKENGESHAY MULAMBA SYMPHORIEN ','$2b$10$mhrZ7qLerQCkrmdWHxTgheE1bzGVUTbPaagnMivRq5Q3BJ.eMHNuW','0992220003','Ville de Lubumbashi, commune Lubumbashi, quartier gambela 2, avenue chemin public, numéro 15','https://lh3.googleusercontent.com/a/ACg8ocJMesC9qnET2_PiANiHhJ9JyCj-tFQgpW1ONQerJHh-eeIXHZ26=s96-c',NULL,'2024-12-14 07:12:32',NULL),('b1fb9f6a-cc47-484a-a0f4-c8a20cbed51a','2025-02-10 13:50:33.189450','2025-02-10 13:50:33.189450',NULL,'musanziwilfried@gmail.com','Wilfried Musanzi',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocKMRN2W3app13mL_OPheufF9jn4A_Pk6J7PoPGUa95qIOMMpL88=s96-c',NULL,'2025-02-10 13:50:33',NULL),('c1076088-758e-42f6-b4e8-7ede20d688aa','2024-12-24 19:17:09.466359','2024-12-24 19:17:09.466359',NULL,'ngcosmasjeremie@gmail.com','Cosmas ngongo ','$2b$10$SJkRq9Vp4uPHCRn.cIm1wu9t6VLwyWzoE8er7dpRV0gcvPb/cQwQy','0998832026','Gambela 2 c/lubumbashi ',NULL,NULL,NULL,NULL),('c63b5aa4-d8ba-4483-832f-35c48f0c6c24','2024-12-27 04:30:22.406007','2024-12-27 04:30:22.406007',NULL,'belumichel5@gmail.com','Michel Belu',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocJI0iKb7RiBnDsnuAcRp7StTuBWJW4QAjiHAPHAzfdw4f0vVKG3=s96-c',NULL,'2024-12-27 04:30:22',NULL),('d4eccd26-f79a-4838-a624-bd62f05c50cb','2024-11-28 21:40:53.285906','2024-12-31 14:28:41.000000',NULL,'BerryN@lunnovel.org','Berry Numbi',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocLiXysVwYX0h9FcYNJa4zvJCvFE7fls-S-J7tJzwqnW2_qm2zo=s96-c',NULL,'2024-12-31 14:28:41',NULL),('d7630e2c-c61f-4d87-9463-5c5dc717e8ea','2024-12-18 16:53:25.973485','2024-12-18 16:53:25.973485',NULL,'innokabongo420@gmail.com','Inno Kabongo',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocKHNlFdJuNZrAHdERW_0_dISNo0M0lOdPLY8vpiBespnpxs0K8t=s96-c',NULL,'2024-12-18 16:53:25',NULL),('d9aa7676-e835-4797-9f7b-c09dba17a533','2024-11-28 08:43:00.735408','2024-12-03 13:34:04.000000',NULL,'reception@cinolu.org','Megan Madia','$2b$10$q4uH6u2LYhy.R/swd8EL1uVhGQn9h37vFzOWnHp4NNNa6XX4k4tnW','+243978651966','Lubumbashi, RDC',NULL,'73643735-bd96-4cef-b09a-9a7d58a58444.webp','2024-11-28 08:43:00',NULL),('dee6400e-f87e-41fc-aa88-54d8431aa374','2024-11-28 08:44:32.794590','2024-12-02 13:25:51.000000',NULL,'evamut07@gmail.com','Evelyne Mutombo','$2b$10$DdrwALHOnDAFXHhhLE7fJ.8CkB1KXaK2iXGIAIzuc/3wCF.05vK2m','+24397680700','Lubumbashi, RDC',NULL,'1e983866-7687-44f8-9078-e8f14a04c27b.jpeg','2024-11-28 08:44:32',NULL),('fcec5feb-d312-4ec1-be6a-da0ac714afbd','2024-12-18 14:27:02.090337','2024-12-25 06:44:39.000000',NULL,'solenetshilobo@gmail.com','solene tshilobo',NULL,NULL,NULL,'https://lh3.googleusercontent.com/a/ACg8ocLQn_v_f-kQecgnOtVYTmQFiX8vZf9FjVgCY-ejUJYdLycf8SgL3Q=s96-c',NULL,'2024-12-18 14:27:02',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_enrolled_projects`
--

DROP TABLE IF EXISTS `user_enrolled_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_enrolled_projects` (
  `userId` varchar(36) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  PRIMARY KEY (`userId`,`projectId`),
  KEY `IDX_cf95f1306b84204ead3ba5f15a` (`userId`),
  KEY `IDX_f46160ca19f4b7f12e6d40ea5d` (`projectId`),
  CONSTRAINT `FK_cf95f1306b84204ead3ba5f15ab` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_f46160ca19f4b7f12e6d40ea5d6` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_enrolled_projects`
--

LOCK TABLES `user_enrolled_projects` WRITE;
/*!40000 ALTER TABLE `user_enrolled_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_enrolled_projects` ENABLE KEYS */;
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
INSERT INTO `user_roles` VALUES ('08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10','31f1b044-edd0-4aa4-936b-16ce430116e2'),('08ea1f7e-ea6f-4a2b-9f79-2eeea4c90f10','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('13d2aaea-4c0e-425c-b458-d7320846c3df','31f1b044-edd0-4aa4-936b-16ce430116e2'),('13d2aaea-4c0e-425c-b458-d7320846c3df','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('14b71c63-5705-418f-8ad5-3c5d9641dcc7','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('2579128b-393d-47bb-9cdc-cad1b581e3f6','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('282dbbe7-bd29-4c19-803f-45d08caee861','31f1b044-edd0-4aa4-936b-16ce430116e2'),('30ec1712-09d7-47b7-a633-3849b3e98827','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('41aaaed0-fcbe-4404-be65-d3c4bd01d8cb','31f1b044-edd0-4aa4-936b-16ce430116e2'),('66472167-02a5-4737-a57f-392ccb029294','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('69d37916-e408-4d78-bc6a-7cbfe6e5132b','31f1b044-edd0-4aa4-936b-16ce430116e2'),('71368b8a-5b12-4638-86a3-760d2310fcae','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('71368b8a-5b12-4638-86a3-760d2310fcae','31f1b044-edd0-4aa4-936b-16ce430116e2'),('71368b8a-5b12-4638-86a3-760d2310fcae','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('80f283ff-0239-4db1-8678-762bd6ca5689','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('80f283ff-0239-4db1-8678-762bd6ca5689','31f1b044-edd0-4aa4-936b-16ce430116e2'),('80f283ff-0239-4db1-8678-762bd6ca5689','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('958b40c2-1d1c-4a4e-a128-276490827264','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('b1fb9f6a-cc47-484a-a0f4-c8a20cbed51a','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('c1076088-758e-42f6-b4e8-7ede20d688aa','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('c63b5aa4-d8ba-4483-832f-35c48f0c6c24','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('d4eccd26-f79a-4838-a624-bd62f05c50cb','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('d4eccd26-f79a-4838-a624-bd62f05c50cb','31f1b044-edd0-4aa4-936b-16ce430116e2'),('d4eccd26-f79a-4838-a624-bd62f05c50cb','c4e41230-da4f-4c8d-8990-a1a0045d55fa'),('d7630e2c-c61f-4d87-9463-5c5dc717e8ea','d7196630-d96a-4fc2-bcd0-cf95aee9bd92'),('d9aa7676-e835-4797-9f7b-c09dba17a533','31f1b044-edd0-4aa4-936b-16ce430116e2'),('dee6400e-f87e-41fc-aa88-54d8431aa374','31f1b044-edd0-4aa4-936b-16ce430116e2'),('fcec5feb-d312-4ec1-be6a-da0ac714afbd','1278e4ec-db80-4bdd-b840-39e7f8386aa1'),('fcec5feb-d312-4ec1-be6a-da0ac714afbd','d7196630-d96a-4fc2-bcd0-cf95aee9bd92');
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
  `image` varchar(255) DEFAULT NULL,
  `founding_date` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `stage` enum('Phase de l''idéation','Phase de démarrage','Phase de croissance','Phase de maturité') NOT NULL,
  `is_published` tinyint(4) NOT NULL DEFAULT 0,
  `userId` varchar(36) DEFAULT NULL,
  `pitch` text NOT NULL,
  `socials` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`socials`)),
  PRIMARY KEY (`id`),
  KEY `FK_0df86d262a1d44d20ddc899fd91` (`userId`),
  CONSTRAINT `FK_0df86d262a1d44d20ddc899fd91` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venture`
--

LOCK TABLES `venture` WRITE;
/*!40000 ALTER TABLE `venture` DISABLE KEYS */;
INSERT INTO `venture` VALUES ('320923a3-4f6c-4733-b3e4-b2a6c6dc4da0','2024-12-25 04:09:09.589155','2024-12-25 04:09:09.589155',NULL,'Projet de développement dans la fabrication et vente des équipements de transformation agroalimentaire ',NULL,'2021-09-06 22:00:00','16, Avenue Prof.Dr.Lunkamba,Q.Mille Collines,C.Annexes','Phase de croissance',0,'66472167-02a5-4737-a57f-392ccb029294','L\'entreprise TECH-VÉRONICA, spécialisée dans la fabrication et vente de divers équipements industriels devant intervenir dans les secteurs de:\n1-Agro-industrie: Batteuse-vanneuse ( de maïs, haricots, sojas,etc), décortiqueur-vanneur des arachides, motoculteur, semoir,etc.\n2-Agro-transformation: Moulin à farine de break fast, moulin multifonctionnel, extrudeuse à beurre d\'arachide, Déshydratateur séchoir,fours électriques, presse à huile, éplucheuse (de maïs, arachides,etc), Broyeur-mélangeur incliné (pour aliments de volailles), Mélangeur horizontal,Granuleur à aliments de volailles,etc\n3-Construction génie civil : Pondeuse à parpaings (moule de briques à bloc ciment), à pavés parcellaires, mixeur de mortiers, Table vibrante,concasseur de pierres,etc.\n4-Minier : Granulateur à cuivre, broyeur à or, concasseur à quartz,etc\n4-Minier: ',NULL);
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

-- Dump completed on 2025-02-10 13:56:14
