-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: abp_authdb
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abp_session_history`
--

DROP TABLE IF EXISTS `abp_session_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abp_session_history` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `abp_user_id` bigint NOT NULL COMMENT 'ABP Users table auto id',
  `session_id` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `channel_name` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `host` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abp_session_history`
--

LOCK TABLES `abp_session_history` WRITE;
/*!40000 ALTER TABLE `abp_session_history` DISABLE KEYS */;
INSERT INTO `abp_session_history` VALUES (1,3,NULL,'','hindi',NULL,NULL,NULL,NULL,NULL,'2024-01-04 09:09:30','2024-01-04 09:09:30'),(2,3,NULL,'test','hindi',NULL,NULL,NULL,NULL,NULL,'2024-01-04 09:16:12','2024-01-04 09:16:12');
/*!40000 ALTER TABLE `abp_session_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `abp_user_profile`
--

DROP TABLE IF EXISTS `abp_user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abp_user_profile` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `abp_user_id` bigint NOT NULL COMMENT 'ABP Users table auto id',
  `comm_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_email_otp` smallint DEFAULT NULL,
  `comm_email_otp_verified` tinyint DEFAULT NULL COMMENT '1= Verified, 2= Pending',
  `comm_mobile_no` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_mobile_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_mobile_otp` smallint DEFAULT NULL,
  `comm_mobile_otp_verified` tinyint DEFAULT NULL COMMENT '1= Verified, 2= Pending',
  `gender` tinyint DEFAULT NULL COMMENT '1= Male, 2= Female, 3= Transgender, 4= Not Disclosed',
  `gender_title` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `country` tinyint DEFAULT NULL COMMENT 'Country ID',
  `country_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` tinyint DEFAULT NULL COMMENT 'State ID',
  `state_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Name of city',
  `website_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Where user first registered',
  `last_profile_edit_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abp_user_profile`
--

LOCK TABLES `abp_user_profile` WRITE;
/*!40000 ALTER TABLE `abp_user_profile` DISABLE KEYS */;
INSERT INTO `abp_user_profile` VALUES (1,1,NULL,NULL,NULL,'9898989999','+91',NULL,NULL,NULL,'male',NULL,NULL,NULL,NULL,NULL,'delhi ncr',NULL,'new delhi',NULL,NULL,'2023-09-13 04:55:10','2023-09-15 02:55:34'),(2,2,NULL,NULL,NULL,'9898989999','+91',NULL,NULL,NULL,'male',NULL,NULL,NULL,NULL,NULL,'delhi ncr',NULL,'new delhi',NULL,NULL,'2023-09-15 03:03:34','2023-09-15 03:03:34');
/*!40000 ALTER TABLE `abp_user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `abp_users`
--

DROP TABLE IF EXISTS `abp_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abp_users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `abp_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ga_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_login_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_user_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_user_picture` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registration_source` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registration_by` tinyint DEFAULT NULL COMMENT '1= Mobile, 2= Email',
  `registration_otp` smallint DEFAULT NULL,
  `registration_otp_verified` tinyint DEFAULT NULL COMMENT '1= Verified, 2= Pending',
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `channel_name` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_name` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  `account_verification_date` datetime DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `abp_users_abp_uuid_unique` (`abp_uuid`),
  UNIQUE KEY `abp_users_user_login_id_unique` (`user_login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abp_users`
--

LOCK TABLES `abp_users` WRITE;
/*!40000 ALTER TABLE `abp_users` DISABLE KEYS */;
INSERT INTO `abp_users` VALUES (1,'abp6480315ff2be60059419266',NULL,'23231','$2y$10$F0GZ2ppLEkzF0We19K/b0.TaIie1k6f7iEc8tdPc0423xvHnTV9ui','aashish@gmail.com','sample_picture.jpg','google',NULL,NULL,NULL,'','app-abpdesam','hindi',NULL,NULL,NULL,'2023-06-07 07:27:27',NULL,NULL,'2023-06-07 01:57:27','2023-09-15 02:55:45'),(2,'abp650416de963201297948957',NULL,'23239','$2y$10$PEAX1ZOoQnjM.DVa3IRd3u0SHJqYqYZ0a.Oz2Fju0EZYXEx0CiOem','aashish@gmail.com','sample_picture.jpg','google',NULL,NULL,NULL,NULL,'app-abpnews','hindi',NULL,NULL,NULL,'2023-09-15 08:33:34',NULL,NULL,'2023-09-15 03:03:34','2023-09-15 03:12:22'),(3,'abp6596c2a72adf91522103832',NULL,'23231292',NULL,'aashishm@abpnetwork.com','test.jpg','google',NULL,NULL,NULL,'amalethia','test','hindi',NULL,NULL,NULL,'2024-01-04 14:37:27',NULL,NULL,'2024-01-04 09:07:27','2024-01-04 09:16:12');
/*!40000 ALTER TABLE `abp_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `abp_users_report`
--

DROP TABLE IF EXISTS `abp_users_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abp_users_report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_users` int NOT NULL DEFAULT '0',
  `web_count_users` int NOT NULL DEFAULT '0',
  `mweb_count_users` int NOT NULL DEFAULT '0',
  `users_last_reg_date` varchar(20) NOT NULL,
  `channel_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abp_users_report`
--

LOCK TABLES `abp_users_report` WRITE;
/*!40000 ALTER TABLE `abp_users_report` DISABLE KEYS */;
INSERT INTO `abp_users_report` VALUES (1,1,0,0,'1991','hindi'),(2,1,0,0,'1991','hindi'),(3,1,0,0,'2023-08-24','hindi'),(4,1,0,0,'2023-08-23','hindi');
/*!40000 ALTER TABLE `abp_users_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(20,'2023_04_26_165957_create_abp_users_table',2),(21,'2023_04_28_111327_create_abp_user_profile_table',2),(22,'2023_04_28_142018_create_abp_session_history_table',2),(24,'2023_06_07_063327_add_channel_name_in_abp_users_table',3),(25,'2023_06_30_110347_add_device_type_in_abp_users_table',4),(27,'2023_09_13_091608_add_country_code_and_state_code_and_gender_title_in_abp_user_profile_table',5);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (4,'App\\Models\\User',1,'auth_token','8af0ef02e3e290348d5cfb53f23c9702652ca35a0a71da76e2e2fadb922cde07','[\"*\"]','2023-04-28 10:01:22',NULL,'2023-04-28 09:37:26','2023-04-28 10:01:22'),(5,'App\\Models\\User',2,'auth_token','0176022037f96e0e1f822ada16a171cd2c6e21a3303a95d8f411c5f668cee32b','[\"*\"]',NULL,NULL,'2023-06-07 01:55:49','2023-06-07 01:55:49'),(6,'App\\Models\\User',1,'auth_token','7d87cb09301b113b506b47dbb36251eadfe5381f1d23d79dcd737005fc686047','[\"*\"]','2023-09-15 03:12:22',NULL,'2023-09-13 04:41:04','2023-09-15 03:12:22'),(7,'App\\Models\\User',1,'auth_token','bd566454492e7da7fa1e6bdd83e5c33c2019dfb7d150ed551e8ef520e041681e','[\"*\"]','2024-01-04 09:16:12',NULL,'2024-01-04 09:15:44','2024-01-04 09:16:12');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aashish Malethia','aashishm@abpnetwork.com',NULL,'$2y$10$NlOlLeW1xHKRgvqnmi3TYOWPPRYe0An0LTvRigsdNS3sbaaWe76Zi',NULL,'2023-04-25 13:25:11','2023-04-25 13:25:11'),(2,'Aashish 2','aashish2@abpnetwork.com',NULL,'$2y$10$qp8MRit3I75aNBEVayQYH.RK/5ZpBkpHB0HaYl7p58PErXSBtCdTq',NULL,'2023-06-07 01:55:49','2023-06-07 01:55:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-07 15:58:37
