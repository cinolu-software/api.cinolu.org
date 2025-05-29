/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.21-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: cinolu
-- ------------------------------------------------------
-- Server version	10.6.21-MariaDB

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
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`answers`)),
  `projectId` varchar(36) DEFAULT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e69389177ac594d36dea539f276` (`projectId`),
  KEY `FK_b4ae3fea4a24b4be1a86dacf8a2` (`userId`),
  CONSTRAINT `FK_b4ae3fea4a24b4be1a86dacf8a2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e69389177ac594d36dea539f276` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
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
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `place` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `started_at` date NOT NULL,
  `is_published` tinyint(4) NOT NULL DEFAULT 0,
  `link` varchar(255) DEFAULT NULL,
  `ended_at` date NOT NULL,
  `programId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e2bd221f0e1dcb7bf8174b6ba59` (`programId`),
  CONSTRAINT `FK_e2bd221f0e1dcb7bf8174b6ba59` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('1d4d29f3-0e5a-488b-8232-4a45cc337242','2025-05-29 08:36:25.987789','2025-05-29 08:36:25.987789',NULL,'AFRILABS ANNUAL GATHERING 2024','afrilabs-annual-gathering-2024',NULL,'South Africa, Cape Town ','Le rassemblement annuel AfriLabs sert de plate-forme à la communauté de l’innovation africaine pour converger, collaborer et faire avancer la transformation numérique du continent. En 2023, organisé par la ministre rwandaise des TIC, Paula Ingabire, l’événement de Kigali s’est concentré sur « l’accélération de l’économie numérique de l’Afrique ; par la force de notre communauté. Des parties prenantes de divers secteurs se sont réunies pour échanger des connaissances et explorer comment l’action collective peut propulser l’Afrique vers un avenir entièrement numérisé d’ici 2030','2024-11-04',1,NULL,'2024-11-07','2d75fd3f-b594-4739-b1b0-88264f571279'),('6abecd0c-7604-4afc-810d-a4f9a88d5a98','2025-05-29 08:47:41.458222','2025-05-29 08:47:41.458222',NULL,'Segal Familly Annnual Meeting','segal-familly-annnual-meeting',NULL,'Kigali, RWANDA','La ville de Kigali a vu plus de 600 personnes se réunir au nom de la transformation de la manière dont le changement se produit en Afrique, représentant des organisations de toutes les parties de l\'univers de la philanthropie. Il y avait quelque chose pour les acteurs, quelque chose pour les donateurs, et encore plus de choses pour tout le monde. Le ton de la réunion était particulièrement triomphant dans le contexte de la pandémie de COVID-19 qui a vu la dernière AGA se tenir il y a trois an','2023-07-11',1,NULL,'2023-07-13','2d75fd3f-b594-4739-b1b0-88264f571279'),('736743a2-aecf-40de-928a-bed56f1274c6','2025-05-29 08:31:23.157017','2025-05-29 08:31:23.157017',NULL,'Timbooktoo Mintech HuB','timbooktoo-mintech-hub',NULL,'Lubumbashi, RDC','Atelier d\'intelligence collective visant la participation d\'acteurs issus des compagnies minières, des universités, des agences de développement et du secteur priv é dans la province du Haut - Katanga. L\'objectif de cet atelier était d\'explorer les problématiques affectant l\'écosystème minier dans la province du Katanga et de promouvoir la synergie entre les acteurs de cet écosystème. L\'atelier a été facilité par une délégation représentant l\'in itiative Timbuktoo, soutenue par le Programme des Nations Unies pour le Développement (PNUD) en Zambie, et par le Laboratoire d\'Accélération du PNUD en République Démocratique du Congo (RDC). L\'initiative Timbuktoo est un programme soutenu par le PNUD, visant à promouvoir l\'écosystème de l\'innovation en Afrique. En Zambie, l\'initiative se concentre sur le soutien à la création d\'un hub de technologie minière (MineTech), rejoignant ainsi sept au tres hubs soutenant divers autres secteurs, à savoir l\'AgriTech (Ghana), la Fintech (Nigéria), les Industries Créatives (Afrique du Sud), la HealthTech (Rwanda), le Climat Vert/Énergie (Kenya), le Commerce/Logistique/E - Commerce (Égypte), les Villes Intelli gentes/Mobilité (Maroc), et le TourismeTech/EdTech (Sénégal). Les hubs sont développés pour répondre aux grands défis auxquels l\'Afrique est confrontée et pour maximiser les avantages issus de sa vague de jeunesse, qui représente 60 à 70 % de sa population (moins de trente ans). Cette immense masse de jeunes produit chaque année un impressionnant flux de 10 millions de personnes entrant sur le marché du travail, dans un environnement où le s opportunités d\'emploi sont limitées.','2024-08-21',1,NULL,'2024-08-21','2d75fd3f-b594-4739-b1b0-88264f571279'),('ca9bd76c-917f-4bd3-90cc-7a6b50266e57','2025-05-29 08:45:23.471224','2025-05-29 08:45:23.471224',NULL,'Revup Woman Webinar','revup-woman-webinar',NULL,'Lubumbashi, RDC','L\'objectif de ce moment est de motiver les femmes entrepreneures à continuer à travailler au développement de leur entreprise et à mettre en pratique tout ce qu\'elles ont appris durant le programme pour la croissance de leur entreprise.','2023-01-18',1,NULL,'2024-01-18','2d75fd3f-b594-4739-b1b0-88264f571279'),('f1105b1c-c7c8-4a3b-8e5e-6351887e8d18','2025-05-29 08:46:24.437407','2025-05-29 08:46:24.437407',NULL,'Binti innovation week','binti-innovation-week',NULL,'Lubumbashi, RDC','Nous vous confirmons que le meet up d\'aujourd\'hui sur le thème Ré-imaginer le cadre professionnel au féminin avec un focus sur le mindset féminin aura bien lieu.','2024-03-26',1,NULL,'2024-03-26','2d75fd3f-b594-4739-b1b0-88264f571279');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_categories_events_category`
--

DROP TABLE IF EXISTS `event_categories_events_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_categories_events_category` (
  `eventId` varchar(36) NOT NULL,
  `eventsCategoryId` varchar(36) NOT NULL,
  PRIMARY KEY (`eventId`,`eventsCategoryId`),
  KEY `IDX_6c52da2816227595d9458d8b54` (`eventId`),
  KEY `IDX_df2d69aad4d88d1a426e01be1f` (`eventsCategoryId`),
  CONSTRAINT `FK_6c52da2816227595d9458d8b54b` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_df2d69aad4d88d1a426e01be1ff` FOREIGN KEY (`eventsCategoryId`) REFERENCES `eventsCategory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_categories_events_category`
--

LOCK TABLES `event_categories_events_category` WRITE;
/*!40000 ALTER TABLE `event_categories_events_category` DISABLE KEYS */;
INSERT INTO `event_categories_events_category` VALUES ('1d4d29f3-0e5a-488b-8232-4a45cc337242','dc536130-7dc5-4249-8305-cdc6377ae4b5'),('6abecd0c-7604-4afc-810d-a4f9a88d5a98','dd281586-fb99-4a62-8a56-1fb1b187b3fd'),('736743a2-aecf-40de-928a-bed56f1274c6','e3478650-0cd5-4b49-89d8-7226ef0aa9bf'),('ca9bd76c-917f-4bd3-90cc-7a6b50266e57','dd281586-fb99-4a62-8a56-1fb1b187b3fd'),('f1105b1c-c7c8-4a3b-8e5e-6351887e8d18','dd281586-fb99-4a62-8a56-1fb1b187b3fd');
/*!40000 ALTER TABLE `event_categories_events_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventsCategory`
--

DROP TABLE IF EXISTS `eventsCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventsCategory` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventsCategory`
--

LOCK TABLES `eventsCategory` WRITE;
/*!40000 ALTER TABLE `eventsCategory` DISABLE KEYS */;
INSERT INTO `eventsCategory` VALUES ('01d850a6-fe9c-4a04-9f96-295f19049703','2025-05-29 07:59:45.941840','2025-05-29 07:59:45.941840',NULL,'Gala'),('06568ab6-edfc-48a6-882c-c45a979790f3','2025-05-29 07:59:07.761596','2025-05-29 07:59:07.761596',NULL,'Forum'),('3472678d-d99b-4bc9-b6c9-6f42ac51568b','2025-05-29 07:58:54.181358','2025-05-29 07:58:54.181358',NULL,'Networking'),('3f0a18d7-26ef-4119-844f-a2c23d77a011','2025-05-29 07:58:31.585342','2025-05-29 07:58:31.585342',NULL,'Workshop d\'exhibition'),('97201b4a-aaff-4e44-8a6f-0bbd7ce272d6','2025-05-29 07:58:41.424183','2025-05-29 07:58:41.424183',NULL,'Compétition'),('a0b044f4-cf41-4dae-9809-cd89e281f790','2025-05-29 07:59:36.422432','2025-05-29 07:59:36.422432',NULL,'Visite'),('b4419563-8f19-4690-9a01-e9908a5beb0e','2025-05-29 07:59:13.610993','2025-05-29 07:59:13.610993',NULL,'Hackathon'),('c131efcd-9ca3-4837-9fa6-aa01d35661c3','2025-05-29 07:59:25.296852','2025-05-29 07:59:25.296852',NULL,'Salon Professionnel'),('d30fd608-3387-4658-9fc5-901b9fee4629','2025-05-29 07:59:01.875687','2025-05-29 07:59:01.875687',NULL,'Séminaire'),('dc536130-7dc5-4249-8305-cdc6377ae4b5','2025-05-29 07:58:19.990493','2025-05-29 07:58:19.990493',NULL,'Team Building'),('dd281586-fb99-4a62-8a56-1fb1b187b3fd','2025-05-29 07:58:49.661313','2025-05-29 07:58:49.661313',NULL,'Webinaire'),('e3478650-0cd5-4b49-89d8-7226ef0aa9bf','2025-05-29 07:59:18.514941','2025-05-29 07:59:18.514941',NULL,'Conférence');
/*!40000 ALTER TABLE `eventsCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertise`
--

DROP TABLE IF EXISTS `expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `expertise` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise`
--

LOCK TABLES `expertise` WRITE;
/*!40000 ALTER TABLE `expertise` DISABLE KEYS */;
/*!40000 ALTER TABLE `expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membersCategory`
--

DROP TABLE IF EXISTS `membersCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `membersCategory` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membersCategory`
--

LOCK TABLES `membersCategory` WRITE;
/*!40000 ALTER TABLE `membersCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `membersCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `is_approved` tinyint(4) NOT NULL DEFAULT 0,
  `location` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_categories_members_category`
--

DROP TABLE IF EXISTS `organization_categories_members_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization_categories_members_category` (
  `organizationId` varchar(36) NOT NULL,
  `membersCategoryId` varchar(36) NOT NULL,
  PRIMARY KEY (`organizationId`,`membersCategoryId`),
  KEY `IDX_35e36563506db950fa80a3cf3b` (`organizationId`),
  KEY `IDX_2d52124f1f773571ebf53f12aa` (`membersCategoryId`),
  CONSTRAINT `FK_2d52124f1f773571ebf53f12aaf` FOREIGN KEY (`membersCategoryId`) REFERENCES `membersCategory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_35e36563506db950fa80a3cf3b4` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_categories_members_category`
--

LOCK TABLES `organization_categories_members_category` WRITE;
/*!40000 ALTER TABLE `organization_categories_members_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `organization_categories_members_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase`
--

DROP TABLE IF EXISTS `phase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `started_at` datetime NOT NULL,
  `ended_at` datetime NOT NULL,
  `requirements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`requirements`)),
  `projectId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ac2930f63ac7178530329b4b219` (`projectId`),
  CONSTRAINT `FK_ac2930f63ac7178530329b4b219` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase`
--

LOCK TABLES `phase` WRITE;
/*!40000 ALTER TABLE `phase` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `authorId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c6fb082a3114f35d0cc27c518e0` (`authorId`),
  CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_categories_posts_category`
--

DROP TABLE IF EXISTS `post_categories_posts_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_categories_posts_category` (
  `postId` varchar(36) NOT NULL,
  `postsCategoryId` varchar(36) NOT NULL,
  PRIMARY KEY (`postId`,`postsCategoryId`),
  KEY `IDX_b25754e2379fc92edd8f6dc1bc` (`postId`),
  KEY `IDX_970b972ade63e4f03e79ef3af4` (`postsCategoryId`),
  CONSTRAINT `FK_970b972ade63e4f03e79ef3af43` FOREIGN KEY (`postsCategoryId`) REFERENCES `postsCategory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b25754e2379fc92edd8f6dc1bcc` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_categories_posts_category`
--

LOCK TABLES `post_categories_posts_category` WRITE;
/*!40000 ALTER TABLE `post_categories_posts_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_categories_posts_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_views`
--

DROP TABLE IF EXISTS `post_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_views` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `ip` varchar(255) NOT NULL,
  `postId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a05ca4e99f3345db11cfe91ee6e` (`postId`),
  CONSTRAINT `FK_a05ca4e99f3345db11cfe91ee6e` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_views`
--

LOCK TABLES `post_views` WRITE;
/*!40000 ALTER TABLE `post_views` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postsCategory`
--

DROP TABLE IF EXISTS `postsCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `postsCategory` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postsCategory`
--

LOCK TABLES `postsCategory` WRITE;
/*!40000 ALTER TABLE `postsCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `postsCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES ('2d75fd3f-b594-4739-b1b0-88264f571279','2025-05-28 13:23:37.833282','2025-05-28 13:23:37.833282',NULL,'Lubumbashi IMPACT | L-IMPACT','L\'objectif principal du projet est d\'accompagner 30 porteurs de projets de création d’entreprise, jeunes et femmes de 18 à 35 ans, à travers un programme d’incubation pour micro et petites et moyennes entreprises (MPME) dans les secteurs de la Technologie, des énergies renouvelables, des TIC (Technologies de l\'Information et de la Communication) et de la transformation agroalimentaire/agro-business.'),('35bf3a97-1681-4382-ae3e-7ff1babc10e6','2025-05-28 13:23:09.485035','2025-05-28 13:23:09.485035',NULL,'Ushindi Talks','Business et Tech talks consqcrés aux technologies émergentes '),('7fc79a61-bf9f-416a-bc2d-86270230d770','2025-05-28 13:27:07.805682','2025-05-28 13:27:07.805682',NULL,'Binti Shares','Acitivité d\'echanges et évaluations des besoins des femmes entrepreneures et innovateurs');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `requirements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`requirements`)),
  `started_at` date NOT NULL,
  `ended_at` date NOT NULL,
  `form` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`form`)),
  `review_form` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`review_form`)),
  `is_published` tinyint(4) NOT NULL DEFAULT 0,
  `programId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6fce32ddd71197807027be6ad3` (`slug`),
  KEY `FK_d4774e6a2f0abb35049d3850e8f` (`programId`),
  CONSTRAINT `FK_d4774e6a2f0abb35049d3850e8f` FOREIGN KEY (`programId`) REFERENCES `program` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('0313d37d-7899-41bc-8472-04f463423aaa','2025-05-29 07:53:39.727864','2025-05-29 07:53:39.727864',NULL,'L\'Impact Saison 1','l\'impact-saison-1',NULL,'L-Impact est un programme d\'incubation collectif, immersif et intensif de 6 mois avec des coaches locaux et internationaux spécialisés dans l\'entrepreneuriat.',NULL,'2023-12-20','2024-03-30',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('10d68613-1e70-4897-be4f-d6cf15fdf271','2025-05-29 07:37:04.514154','2025-05-29 07:37:04.514154',NULL,'L\'IA et la gestion de l\'expérience client','l\'ia-et-la-gestion-de-l\'experience-client',NULL,'Sensibilisation au numérique et à l’IA : Permettre aux entrepreneurs débutants de comprendre comment ces technologies peuvent transformer leur activité.Renforcement des compétences : Acquérir des compétences pratiques sur des outils numériques et d’IA adaptés à la gestion de leur entreprise.',NULL,'2025-02-18','2025-02-18',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('1549a4a1-cb30-49c9-9977-998c1fd9782e','2025-05-29 07:23:29.260646','2025-05-29 07:23:29.260646',NULL,'AfriStart - RED Start Tunisie','afristart-red-start-tunisie',NULL,'Appel à condidature - Pitch Day- Accéleration et préparation aux missions- 2 missions en RDC et au Kenya- Suivi post et accompagnement post missions',NULL,'2024-12-17','2026-02-26',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('178af5f5-6eed-41ff-b80c-c0efb2c8dacf','2025-05-29 07:15:24.705609','2025-05-29 07:15:24.705609',NULL,'Ashoka Visionary Program','ashoka-visionary-program',NULL,'Ashoka is the global professional association of the world’s leading social entrepreneurs — individuals with new ideas for addressing our biggest societal challenges and with the entrepreneurial skills to transform those ideas into national, regional and global impact. For almost 40 years we have identified and supported more than 3,800 social entrepreneurs — Ashoka Fellows — in over 80 countries, solving systemic problems in education, healthcare, civic participation, economic development, environmental protection and other key areas',NULL,'2025-01-24','2025-07-28',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('1f37960f-67d4-41f5-acd9-e4d0dad74f73','2025-05-29 07:48:32.935090','2025-05-29 07:48:32.935090',NULL,'Afrilabs Atelier Regional Hybride 2024','afrilabs-atelier-regional-hybride-2024',NULL,'3 journées consacrees à:Formation des hubs managersMeetup et connexions des pairsTour Ecosysteme',NULL,'2024-07-23','2024-07-25',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('21f8b76f-593c-4f29-8a9d-134bbda6be04','2025-05-29 07:17:10.394344','2025-05-29 07:17:10.394344',NULL,'African Visionary Fellowship (AVF)','african-visionary-fellowship-(avf)',NULL,'Since 2017, the Fellowship has offered community, connections, and capacity to stellar proximate leaders of African organizations. African Visionary Fellows receive mentorship, exposure, and the support of a community of like-minded changemakers.Beginning in 2017 with a cohort of 25 fellows from eight countries across Sub-Saharan Africa, the African Visionary Fellowship seeks to shift power and agency closer to the beneficiaries of development work. The value proposition for supporting local visionaries is clear and common sense:Local solutions can be more sustainableLocal solutions can be more impactful',NULL,'2023-08-13','2024-03-14',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('23d652e9-e0bf-4fd0-acbc-3cd7f186a183','2025-05-29 07:37:53.881520','2025-05-29 07:37:53.881520',NULL,'Dskills - Sprint up program','dskills-sprint-up-program',NULL,'The Digital Innovations for Business Resilience in the EAC – Innovators Sprint up Programme” is part of the East African Community (EAC) project, “Digital Skills for an Innovative East African Industry” (dSkills@EA) implemented by the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) and the Inter University Council for East Africa (IUCEA) across all EAC Partner States. The project focuses on strengthening academia-industry collaboration in digital skills training and innovation transfer to improve the uptake of digital skills and innovations by the industry in the region.The Innovators Sprint Up programme is being implemented (under the dSkills@EA project with the support of) by the Association of Startups and SMEs Enablers of Kenya (ASSEK) in a consortium of innovator Support Organizations (ESOs) that includes: E4Impact Foundation, Ennovate Ventures, Aclis, Koneta Hub and Cinolu Hub, on behalf of GIZ and IUCEA.',NULL,'2024-07-31','2024-10-30',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('3838640d-c3b6-479f-9e81-5c83d552fe00','2025-05-29 07:35:14.429249','2025-05-29 07:35:14.429249',NULL,'Ushindi  Talks  Q1 2025','ushindi-talks-q1-2025',NULL,'3 Ateliers cles :- L\'iA - Cas d\'usage Edtech a Lubumbashi avec Easy Life , Herman Ngoy , RDC- Le Deep Fake  - Enjeu et ethique avec Azerty informatique , Sénégal, RDC',NULL,'2025-02-16','2025-02-27',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('47059208-80cb-4bc5-af6c-99685befbafb','2025-05-29 07:25:40.767328','2025-05-29 07:25:40.767328',NULL,'Fikiri Sdg','fikiri-sdg',NULL,'Programme dédiée à la cartographie, l\'exploration et l\'expérimentation des solutions innovantes locales pour accélérer l\'atteinte des Objectifs de Développement durables .',NULL,'2023-10-31','2024-01-30',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('735ec673-99df-460a-879a-9746ab8eeae6','2025-05-29 07:51:13.058784','2025-05-29 07:51:13.058784',NULL,'Afriab\'s Anual Gathering','afriab\'s-anual-gathering',NULL,'Le rassemblement annuel d\'AfriLabs est uneopportunité unique pour les pôlestechnologiques du réseau AfriLabs et d\'autresparties prenantes de l\'écosystème technologiqueet d\'innovation africain et mondial (tels que lesentreprises, les agences de développement, lesuniversités et les investisseurs) de se réunir, deréseauter, d\'apprendre et de partager desconnaissances.',NULL,'2025-10-07','2025-10-09',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('750cd958-3ace-491a-96b1-0aca48c29df8','2025-05-29 07:52:56.743003','2025-05-29 07:52:56.743003',NULL,'Global Startup Awards - Africa 2024','global-startup-awards-africa-2024',NULL,'The Global Startup Awards bring together high impact startups and investors from over 100 countries across the globe. The network offers participants the opportunity to meet prospective mentors, partners, clients, and gain access to the latest industry trends.The competition process also brings together local ambassadors, country partners, national jury members, international jury members as well as key advisors to discover winners in all aspects of the startup ecosystem.The Global Innovation Initiative Group (GIIG) exists to Find, Fund and grow innovation in Africa. GIIG is the exclusive rights holder to the Global Startup Awards Africa, serving as a scouting vehicle to discover entrepreneurs across all sectors in Africa.The GIIG Africa Fund is a unique profit and purpose fund that invests in world-changing technologies. The GIIG Africa Foundation pairs African innovators with the right skills & strategies and connects them to global partners for scale.Find out More https://www.globalstartupawardsafrica.com/',NULL,'2024-01-07','2024-11-21',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('7f7f4319-371d-4207-b69e-9e0f97cd2026','2025-05-29 07:20:50.247944','2025-05-29 07:20:50.247944',NULL,'L\'impact - Cohorte 2','l\'impact-cohorte-2',NULL,'La première édition de L-Impact montre déjà des résultats très encourageants. Elle a débuté en mars avec un premier module auquel une cinquantaine d’entrepreneurs ont pris part. Suite à cette première semaine, un jury a sélectionné les projets les plus motivés, pertinents et ambitieux pour continuer l’aventure. Le programme dans son ensemble comprend la formation des coaches et un accompagnement de 6 mois constitué de modules intensifs, de coaching personnalisés, de mise à disposition d’une large boîte à outils, d’événements de connexion à l’écosystème et d’une communauté entrepreneuriale énergique! Au cours de ces modules, les entrepreneurs ont pu, petit à petit et par itérations, construire leur projet sur des bases solides en répondant à des questions essentielles ; Qui est ma cible de quoi a-t-elle besoin ? Est-ce que mon offre répond aux attentes de mes clients ? Quel est le prix le plus adéquat pour mon produit/service ? A quel point mon projet est-il rentable ?, etc. Ils ont appris à écouter le public cible',NULL,'2024-01-07','2024-05-24',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('91e3ac64-cd91-4890-b769-cbb1778417b2','2025-05-29 07:18:56.575892','2025-05-29 07:18:56.575892',NULL,'Smart city Specialisation Program (SCIP)','smart-city-specialisation-program-(scip)',NULL,'Innovation Support Organizations (ISOs) across Africa often take a generalist approach to supporting startups, lacking strategic focus and specialization in niche sectors. This limits their ability to provide tailored assistance, mentorship, tools and access to partners that tech entrepreneurs need. There is a need to build a collaborative pan-African community of mission-driven, specialized Smart Cities ISOs that can fully support startups to develop innovative solutions for Africa\'s growing cities. To address this gap, the program will select 13 ISOs from Kenya, Uganda, Tanzania, Rwanda, Burundi, Congo, Zambia, Botswana, and South Africa, with at least one organization represented per country. Needs assessments will be conducted for each participating ISO to design a tailored, week-long capacity building bootcamp. The in-person bootcamp will equip ISOs with practical strategies and support them to develop individualized game plans.Crucially, the program does not end after the bootcamp. To ensure sustainability of outcomes, the ISOs will be supported throughout the duration of the program through peer exchange, individual mentoring sessions, and expert workshops that will facilitate ongoing collaboration and knowledge sharing amongst the ISOs.',NULL,'2023-08-13','2024-03-14',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('96b2f8cb-c9b7-4a19-88e5-095722e79ed9','2025-05-29 07:28:43.453337','2025-05-29 07:28:43.453337',NULL,'Katalicc - Cohorte 1','katalicc-cohorte-1',NULL,'Incubation de 3 mois pour artistes dans l\'audio visuel, la mode et la 3D, montage et structuration de projets - formation- accompagnement- financement',NULL,'2023-10-15','2024-02-22',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('9a2e096c-0120-4108-8022-e4dc4e752e59','2025-05-29 07:34:20.576423','2025-05-29 07:34:20.576423',NULL,'Afrilabs Capacity Building  2023 - Physical workshop','afrilabs-capacity-building-2023-physical-workshop',NULL,'Formation gestion des hubs d\'innovation- Mentorat- Atelier d\'echange, AfriLabs Capacity Building Programme (ACBP), A 2m euro, 36-month intensive capacity building programme, is being implemented thanks to Agence Française de Développement (AFD)’s support through the Digital Africa seed fund. The programme aims to strengthen hubs so that they can attract investments and run local and regional impact-driven programs that will support entrepreneurs and startups and contribute to growing the African innovation ecosystem.',NULL,'2023-05-10','2023-05-12',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('a8d3f97c-4236-4ae9-b6da-acd137a7eae1','2025-05-29 07:21:44.852646','2025-05-29 07:21:44.852646',NULL,'Katalicc cohorte 2','katalicc-cohorte-2',NULL,'Le projet Katalicc , l\'Incubateur des Industries Créatives et Curelles offre 3mois d\'incubation des projets assortis d\'une accélération de l\'offre créative',NULL,'2024-04-16','2024-05-24',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('b2b31f95-2c99-492d-90c6-53c947b8c8c7','2025-05-29 07:36:18.254303','2025-05-29 07:36:18.254303',NULL,'L\'impact Saison 3 by Sopa+','l\'impact-saison-3-by-sopa+',NULL,'The Stop Online Piracy Act (SOPA) had a significant potential impact on the internet by allowing for the removal of websites that hosted or linked to copyrighted material considered infringing, even if only a small portion of the site was involved, leading to concerns about censorship, stifling innovation, and harming legitimate online businesses due to its broad and potentially overreaching measures.',NULL,'2024-12-15','2025-06-26',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('c086c01b-5c12-4ce2-b929-7dacf12793d0','2025-05-29 07:27:01.066300','2025-05-29 07:27:01.066300',NULL,'Le Pouvoir de l\'Intelligence Artificielle pour Attirer et Convertir Plus de Clients : Viens Découvrir Comment Faire','le-pouvoir-de-l\'intelligence-artificielle-pour-attirer-et-convertir-plus-de-clients-:-viens-decouvrir-comment-faire',NULL,'un webinaire d\'une heure 30min avec un intervenant professionnel dans le domaine, pour aider les participants d\'apprendre sur les stratégies a exécuter',NULL,'2025-03-21','2025-03-21',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('c85b0e5e-8c0d-4b3b-b4f8-b7f976c16bd1','2025-05-29 07:52:00.225602','2025-05-29 07:52:00.225602',NULL,'Binti Share - 2024','binti-share-2024',NULL,'Le programme s\'articule autour de 3 thématiques/ industries  clés ou les femmes foisonnent en 2024  et d\'un focus groupATELIER 1 : 1er Février 2024Format : En ligne sur ZoomThème : EDUCATION ET FORMATION1. Discuter de défis liés à l\'éducation et la formation des femmes en entrepreneuriat etidentifier des moyens de renforcer leur accès à ces ressources2. La vision et les objectifs des femmes entrepreneures : Comprendre comment les femmesentrepreneures définissent leur succès et leurs objectifs afin de mieux comprendre pourquoileurs entreprises demeurent à petite échelle.Guests : Afin de comprendre le niveau d’implication et de participation des femmes aux formations,nous avons ciblé 2 guests qui pourront nous parler des difficultés qu’elles rencontrent en tantqu’organisation1. Mme Yaya Ntema, Centre de formation Lugo farm2. Kileshe Kasoma pour le compte de OcademyMobilisation : exploiter le réseau des femmes revup ( lubumbashi,kinshasa, cameroun), et lesfemmes de l’écosystème.ATELIER 2 : 7 février 2024Format : En ligne, sur ZoomThème : ACCES AU FINANCEMENTLes défis rencontrés par les femmes entrepreneurs dans l\'accès au financement et aux ressources :cet échange va porter sur les obstacles spécifiques auxquels les femmes sont confrontées lorsqu\'ellescherchent à obtenir un financement pour leur entreprise, ainsi que sur les solutions possibles pourcombler ces fossés.Guest : Afin de comprendre le niveau d’implication et de participation des femmes aux programmesde financement et les fossés observés, nous avons ciblé Smico, qui pourra nous parler de leurconstat.ATELIER 3 : 15 février 2024Format : En ligne, sur ZoomThème : LEADERSHIP1. Leadership féminin : explorer les défis auxquels les femmes sont confrontées en tant queleaders d\'entreprise et discuter des moyens de promouvoir leur leadership et leurreprésentation.2. La sous-représentation des femmes dans les postes de direction et de prise de décision :cette discussion va se concentrer sur la manière dont les stéréotypes de genre et lesbarrières sociétales limitent l\'accès des femmes à des rôles de leadership dans le secteurentrepreneurial, et sur les stratégies pour promouvoir une plus grande égalité des chances.3. Équilibre travail-vie personnelle : discuter des défis liés à l\'équilibre entre la vieprofessionnelle et la vie personnelle pour les femmes entrepreneures et partager desstratégies pour y faire face.',NULL,'2024-01-31','2024-02-27',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('cc7e3322-33c3-4f0d-b038-d2387e92774c','2025-05-29 07:31:11.927335','2025-05-29 07:31:11.927335',NULL,'Seedstars EWA  Hub Mentoring','seedstars-ewa-hub-mentoring',NULL,'Women entrepreneurs face multiple challenges to accessing finance, with an estimated $42 billion financing gap for African women across business value chains. According to the United Nations’ Global Entrepreneurship Monitor study, around 56% of women entrepreneurs in Sub-Saharan Africa cite either unprofitability or lack of finances as a reason for closing down their businesses.EWEA determined some of the biggest obstacles women face in business include a lack of an enabling environment for women businesses to grow their skills, thrive, and rise to management positions. Nevertheless, in terms of potential, they are as efficient and growth-oriented as male-owned businesses.Through a collaboration with the African Development Bank’s AFAWA initiative and GrowthAfrica, the EWEA program is set to provide long-term and scalable capacity building, access to mentorship, access to funding, and access to visibility for both WSMEs and community enablers in Cameroon, Democratic Republic of Congo, Kenya, Malawi, Morocco, Mozambique, Senegal, South Africa, Tanzania, Rwanda, and Zambia.',NULL,'2024-07-07','2024-12-12',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('ce82072b-ebff-4605-8876-7fb8b80166e9','2025-05-29 07:22:39.966820','2025-05-29 07:22:39.966820',NULL,'Revup women  2023 Incubation program','revup-women-2023-incubation-program',NULL,'The recent push for gender equality and women’s empowerment over the last 3 decades has led to the emergence of female entrepreneurs and female-led startups on the continent. Research by the World Bank shows that women make up 58% of Africa’s self-employed population and are more likely to become entrepreneurs than men. At 26%, Sub-Saharan Africa is home to the world’s highest percentage of women entrepreneurs – according to the MasterCard Index of Women Entrepreneurs (MIWE) 2021.Yet, according to data from the AfriLabs – Briter Bridges Innovation Ecosystem Report and AfriLabs Needs Assessment report, women-led businesses in Africa continue to face unique challenges that see them perform poorly compared to men-led enterprises. The challenges range from social issues such as challenging social expectations, building a support network, balancing work and family life, and coping with the fear of failure to business-related.',NULL,'2023-08-06','2023-10-30',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('d445a7d2-6663-4ee3-af97-3af85af3551f','2025-05-29 07:20:05.870968','2025-05-29 07:20:05.870968',NULL,'Dskills- Incubation Leadership and Innovation Management Program','dskills-incubation-leadership-and-innovation-management-program',NULL,'The Incubation Leadership and Innovation Management Program aims to equip university students with the skills and knowledge necessary to thrive in entrepreneurial environments. Trainers will play a crucial role in guiding participants through the principles of incubation, innovation management, and effective leadership.',NULL,'2024-12-15','2024-12-19',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('d671bca7-060c-4e4e-9b7f-625f8fff255a','2025-05-29 07:49:20.594800','2025-05-29 07:49:20.594800',NULL,'Binti Shares -2025','binti-shares-2025',NULL,'3 Rencontres clés  ( Meetup ) avec les étudiants de diverses universités sur le continent- 2 Focus Groupes consacrés aux cadres universitaires et les structures d\'accompagne,ent ( incubateur, interface universitaire, accelerateurs)',NULL,'2025-02-26','2025-03-13',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('d82ea295-7ced-4c3b-9728-3045876c8fde','2025-05-29 07:30:07.496337','2025-05-29 07:30:07.496337',NULL,'Revup women 2024- Mentorship','revup-women-2024-mentorship',NULL,'Women-led enterprises in Africa are not receiving enough supportThe recent push for gender equality and women’s empowerment over the last 3 decades has led to the emergence of female entrepreneurs and female-led startups on the continent. Research by the World Bank shows that women make up 58% of Africa’s self-employed population and are more likely to become entrepreneurs than men. At 26%, Sub-Saharan Africa is home to the world’s highest percentage of women entrepreneurs – according to the MasterCard Index of Women Entrepreneurs (MIWE) 2021.Yet, according to data from the AfriLabs – Briter Bridges Innovation Ecosystem Report and AfriLabs Needs Assessment report, women-led businesses in Africa continue to face unique challenges that see them perform poorly compared to men-led enterprises. The challenges range from social issues such as challenging social expectations, building a support network, balancing work and family life, and coping with the fear of failure to business-related issues like limited access to markets, finance, technology and network.',NULL,'2024-03-10','2024-12-30',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279'),('e9ff9bda-e581-49bf-8683-877a2dcfe514','2025-05-29 07:50:10.072772','2025-05-29 07:50:10.072772',NULL,'Mozalisi Lubumbashi','mozalisi-lubumbashi',NULL,'Un programme d’entrepreneuriat à l’initiative d’Africalia et déployépar Ukamili Digital City et Africalia. Il vise à consolider les entreprises luchoisesévoluant dans les industries culturelles et créatives (ICC), dont les secteurs d’activitéont pour objet principal la création, le développement, la production, la reproduction,la promotion, la diffusion ou la commercialisation de biens, de services et activités quiont un contenu culturel, artistique et/ou patrimonial.',NULL,'2024-11-24','2025-11-24',NULL,NULL,1,'2d75fd3f-b594-4739-b1b0-88264f571279');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_categories_projects_category`
--

DROP TABLE IF EXISTS `project_categories_projects_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_categories_projects_category` (
  `projectId` varchar(36) NOT NULL,
  `projectsCategoryId` varchar(36) NOT NULL,
  PRIMARY KEY (`projectId`,`projectsCategoryId`),
  KEY `IDX_bbf00d20e490cc867974ad59c2` (`projectId`),
  KEY `IDX_74f532443feb087c1f72b5e5cd` (`projectsCategoryId`),
  CONSTRAINT `FK_74f532443feb087c1f72b5e5cdd` FOREIGN KEY (`projectsCategoryId`) REFERENCES `projectsCategory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_bbf00d20e490cc867974ad59c2a` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_categories_projects_category`
--

LOCK TABLES `project_categories_projects_category` WRITE;
/*!40000 ALTER TABLE `project_categories_projects_category` DISABLE KEYS */;
INSERT INTO `project_categories_projects_category` VALUES ('0313d37d-7899-41bc-8472-04f463423aaa','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('10d68613-1e70-4897-be4f-d6cf15fdf271','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('1549a4a1-cb30-49c9-9977-998c1fd9782e','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('178af5f5-6eed-41ff-b80c-c0efb2c8dacf','036ea8c1-6c8e-400f-bafc-101b51185364'),('178af5f5-6eed-41ff-b80c-c0efb2c8dacf','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('1f37960f-67d4-41f5-acd9-e4d0dad74f73','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('21f8b76f-593c-4f29-8a9d-134bbda6be04','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('23d652e9-e0bf-4fd0-acbc-3cd7f186a183','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('3838640d-c3b6-479f-9e81-5c83d552fe00','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('47059208-80cb-4bc5-af6c-99685befbafb','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('735ec673-99df-460a-879a-9746ab8eeae6','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('750cd958-3ace-491a-96b1-0aca48c29df8','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('7f7f4319-371d-4207-b69e-9e0f97cd2026','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('91e3ac64-cd91-4890-b769-cbb1778417b2','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('96b2f8cb-c9b7-4a19-88e5-095722e79ed9','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('9a2e096c-0120-4108-8022-e4dc4e752e59','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('a8d3f97c-4236-4ae9-b6da-acd137a7eae1','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('b2b31f95-2c99-492d-90c6-53c947b8c8c7','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('c086c01b-5c12-4ce2-b929-7dacf12793d0','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('c85b0e5e-8c0d-4b3b-b4f8-b7f976c16bd1','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('cc7e3322-33c3-4f0d-b038-d2387e92774c','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('ce82072b-ebff-4605-8876-7fb8b80166e9','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('d445a7d2-6663-4ee3-af97-3af85af3551f','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('d671bca7-060c-4e4e-9b7f-625f8fff255a','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('d82ea295-7ced-4c3b-9728-3045876c8fde','8d3b6b53-7c3d-49bb-af72-518be578fc0e'),('e9ff9bda-e581-49bf-8683-877a2dcfe514','8d3b6b53-7c3d-49bb-af72-518be578fc0e');
/*!40000 ALTER TABLE `project_categories_projects_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_partners_organization`
--

DROP TABLE IF EXISTS `project_partners_organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_partners_organization` (
  `projectId` varchar(36) NOT NULL,
  `organizationId` varchar(36) NOT NULL,
  PRIMARY KEY (`projectId`,`organizationId`),
  KEY `IDX_e5b2e2ab999b530d924f6744d1` (`projectId`),
  KEY `IDX_b5cd8e14fa4067717beced15a0` (`organizationId`),
  CONSTRAINT `FK_b5cd8e14fa4067717beced15a0b` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e5b2e2ab999b530d924f6744d1c` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_partners_organization`
--

LOCK TABLES `project_partners_organization` WRITE;
/*!40000 ALTER TABLE `project_partners_organization` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_partners_organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectsCategory`
--

DROP TABLE IF EXISTS `projectsCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectsCategory` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectsCategory`
--

LOCK TABLES `projectsCategory` WRITE;
/*!40000 ALTER TABLE `projectsCategory` DISABLE KEYS */;
INSERT INTO `projectsCategory` VALUES ('036ea8c1-6c8e-400f-bafc-101b51185364','2025-05-29 06:53:50.587585','2025-05-29 06:53:50.587585',NULL,'Dévelopement de l\'ecosystème'),('0713d205-c734-4273-9de4-8b941553e1c7','2025-05-29 06:53:59.191511','2025-05-29 06:53:59.191511',NULL,'Accompagnement et Développement'),('377b97e3-7c0f-42db-ae2f-8aae95474f0d','2025-05-29 06:53:27.440770','2025-05-29 06:53:27.440770',NULL,'Accompagnement pour jeunes professionnels & entrepreneurs (Ushindi)'),('8d3b6b53-7c3d-49bb-af72-518be578fc0e','2025-05-29 06:53:16.600381','2025-05-29 06:53:16.600381',NULL,'Développement organisationnel'),('8fa797c3-8b9d-4d79-b727-69a55091aacb','2025-05-29 06:53:39.113407','2025-05-29 06:53:39.113407',NULL,'Accompagnement pour la recherche & milieu académique (Uvumbuzi)'),('e6411964-0803-4a6e-83f8-7d99f9085371','2025-05-29 06:52:52.273972','2025-05-29 06:52:52.273972',NULL,'Programme d\'inclusion  Genre (F360)'),('f60c8ac3-4629-461b-8a3b-02a9d55d1098','2025-05-29 06:53:03.586284','2025-05-29 06:53:03.586284',NULL,'Accompagnement pour les mineurs (Ushaidi)');
/*!40000 ALTER TABLE `projectsCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `status` enum('pending','cartography','exploration','experimentation') NOT NULL DEFAULT 'pending',
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `applicationId` varchar(36) DEFAULT NULL,
  `reviewerId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8d5525f4acba6e2149fb5da4a8c` (`applicationId`),
  KEY `FK_34413365b39e3bf5bea866569b4` (`reviewerId`),
  CONSTRAINT `FK_34413365b39e3bf5bea866569b4` FOREIGN KEY (`reviewerId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_8d5525f4acba6e2149fb5da4a8c` FOREIGN KEY (`applicationId`) REFERENCES `application` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
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
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('60c2c5b0-a1ca-4077-b6d8-6b6a467b9706','2025-05-28 09:04:15.370947','2025-05-28 09:04:15.370947',NULL,'coach'),('9041b57a-9d7e-4400-93d2-92e293f5a896','2025-05-28 09:04:15.370587','2025-05-28 09:04:15.370587',NULL,'staff'),('9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc','2025-05-28 09:04:15.362380','2025-05-28 09:04:15.362380',NULL,'admin'),('b10b6e96-3827-4e99-886e-2a7f392a4152','2025-05-28 09:04:15.370305','2025-05-28 09:04:15.370305',NULL,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `google_image` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2821a167-8344-40a0-a507-c66d2c6a5ba6','2025-05-29 08:57:15.283107','2025-05-29 08:57:15.283107',NULL,'evelynm@cinolu.org','Evelyne Mutombo','$2b$10$vVDG48tM61NpaNeG6vvJGuzGxjIRrPnl1xJB9xfCYc9g4ynfHvUOm',NULL,'+243977777779','Lubumbashi, RDC',NULL,NULL),('2c0e3539-d3ef-4fb6-a4e3-fd324aee65ab','2025-05-29 08:52:39.797501','2025-05-29 08:52:39.797501',NULL,'josuev@cinolu.org','Josue Vangu','$2b$10$HeTjoD3IyeUpjIXuDMCoi.9y6flyJHrNLizhIlb7PjpfJQHC5yUVu',NULL,'+243977777779','Lubumbashi, RDC',NULL,NULL),('40719a07-f415-4bff-a3b1-5fc2b7775307','2025-05-29 08:54:40.523284','2025-05-29 08:54:40.523284',NULL,'BerryN@lunnovel.org','Berry NUMBI','$2b$10$EaWU0tvnLLTxdFWo34TSfOPRQfc4URhDly6FyMR4.kZBRvUHMP/em',NULL,'+243977777779','Lubumbashi, RDC',NULL,NULL),('4aa3e0bd-3e98-4c1f-9288-0f5359e76219','2025-05-28 09:04:15.432262','2025-05-28 09:04:15.432262',NULL,'admin@admin.com','Brandy','$2b$10$8DpyvxkzvWliWbmgukGFT./r0/D8bj1A6HMAzxFWbNsH5VtVm2cuK',NULL,'1-868-235-3175 x49770','190 Washington Boulevard',NULL,NULL),('732fdfbc-9dbf-4f4d-8ff5-970768b90265','2025-05-29 08:57:39.059389','2025-05-29 08:57:39.059389',NULL,'moisez@cinolu.org','Moise Kalunga','$2b$10$BwCOR2HoXvzeQevraUHt.uhLBx9b5X5pvk1kfn1ERDd6K2xLXeobO',NULL,'+243977777779','Lubumbashi, RDC',NULL,NULL),('797095b7-ff87-4d19-a004-c159ddc91b9c','2025-05-29 08:59:24.282170','2025-05-29 08:59:24.282170',NULL,'rodriguezm@cinolu.org','Rodriguez Monga','$2b$10$a.rKn6ThYlNvPGOGhWQRw.aRaCdvIXf6YHCHEGYogn8pE.V3BYbUe',NULL,'+243977777779','Lubumbashi, RDC',NULL,NULL),('7f843db3-35f0-4a52-897f-e2e7da39bc5d','2025-05-29 08:51:54.848835','2025-05-29 08:51:54.848835',NULL,'wilfriedm@cinolu.org','Wilfried Musanzi','$2b$10$OyOjBj6F/A9U5AV0tpnTEubPTRoNBDVJLcnJvTbeGUXM9J6IkBKu6',NULL,'+243979265726','Lubumbashi, RDC',NULL,NULL),('f74a1b86-4444-41c5-97a3-f834aec8315e','2025-05-29 08:52:58.493072','2025-05-29 08:52:58.493072',NULL,'josuek@cinolu.org','Josue Banku','$2b$10$vr0cfdnq5AVDXCXnTcjh6eK5w/6JtqggzBwHU8DEA8ytRVcPbbQ.G',NULL,'+243977777779','Lubumbashi, RDC',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_expertises_expertise`
--

DROP TABLE IF EXISTS `user_expertises_expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_expertises_expertise` (
  `userId` varchar(36) NOT NULL,
  `expertiseId` varchar(36) NOT NULL,
  PRIMARY KEY (`userId`,`expertiseId`),
  KEY `IDX_968b205a0347113d422a40e48a` (`userId`),
  KEY `IDX_44686bc8b33bab05ad204eac17` (`expertiseId`),
  CONSTRAINT `FK_44686bc8b33bab05ad204eac17e` FOREIGN KEY (`expertiseId`) REFERENCES `expertise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_968b205a0347113d422a40e48a6` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_expertises_expertise`
--

LOCK TABLES `user_expertises_expertise` WRITE;
/*!40000 ALTER TABLE `user_expertises_expertise` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_expertises_expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_postions_position`
--

DROP TABLE IF EXISTS `user_postions_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_postions_position` (
  `userId` varchar(36) NOT NULL,
  `positionId` varchar(36) NOT NULL,
  PRIMARY KEY (`userId`,`positionId`),
  KEY `IDX_2ae2656820cda3ec0f894fcf7d` (`userId`),
  KEY `IDX_7bb074196b373389fee5ea56ac` (`positionId`),
  CONSTRAINT `FK_2ae2656820cda3ec0f894fcf7d9` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_7bb074196b373389fee5ea56ac7` FOREIGN KEY (`positionId`) REFERENCES `position` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_postions_position`
--

LOCK TABLES `user_postions_position` WRITE;
/*!40000 ALTER TABLE `user_postions_position` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_postions_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_projects_project`
--

DROP TABLE IF EXISTS `user_projects_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_projects_project` (
  `userId` varchar(36) NOT NULL,
  `projectId` varchar(36) NOT NULL,
  PRIMARY KEY (`userId`,`projectId`),
  KEY `IDX_79daf0d2be103f4c30c77ddd6b` (`userId`),
  KEY `IDX_936561888bfd63d01c79fe415c` (`projectId`),
  CONSTRAINT `FK_79daf0d2be103f4c30c77ddd6be` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_936561888bfd63d01c79fe415c3` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_projects_project`
--

LOCK TABLES `user_projects_project` WRITE;
/*!40000 ALTER TABLE `user_projects_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_projects_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles_role`
--

DROP TABLE IF EXISTS `user_roles_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles_role` (
  `userId` varchar(36) NOT NULL,
  `roleId` varchar(36) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `IDX_5f9286e6c25594c6b88c108db7` (`userId`),
  KEY `IDX_4be2f7adf862634f5f803d246b` (`roleId`),
  CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles_role`
--

LOCK TABLES `user_roles_role` WRITE;
/*!40000 ALTER TABLE `user_roles_role` DISABLE KEYS */;
INSERT INTO `user_roles_role` VALUES ('2821a167-8344-40a0-a507-c66d2c6a5ba6','9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc'),('2c0e3539-d3ef-4fb6-a4e3-fd324aee65ab','9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc'),('40719a07-f415-4bff-a3b1-5fc2b7775307','9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc'),('4aa3e0bd-3e98-4c1f-9288-0f5359e76219','9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc'),('732fdfbc-9dbf-4f4d-8ff5-970768b90265','9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc'),('797095b7-ff87-4d19-a004-c159ddc91b9c','9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc'),('7f843db3-35f0-4a52-897f-e2e7da39bc5d','9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc'),('f74a1b86-4444-41c5-97a3-f834aec8315e','9a7838b4-b5be-4a73-8f9e-8a84eb4fdbcc');
/*!40000 ALTER TABLE `user_roles_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-29  9:08:16
