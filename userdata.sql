-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2024 at 03:39 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `userdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `sid` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `sid`, `user_id`, `token`, `started_at`, `expires_at`, `createdAt`, `updatedAt`) VALUES
(1, '\"5uFI43wno9UBf1-lOl_lJTDivc6MP-3S\"', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNTM4OTM5NSwiZXhwIjoxNzA1MzkyOTk1fQ.X23_kc2jlmWhAfF5kRXJvod6GLCGD3QEiplu9vMBMuw', '2024-01-16 07:16:35', '2024-01-16 08:16:35', '2024-01-16 07:16:35', '2024-01-16 07:16:35'),
(2, '\"A2ed4NMA8NACawTFONlr8UyEixioHkpK\"', 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTcwNjUwODY2MCwiZXhwIjoxNzA2NTEyMjYwfQ.QSfUVWatgL4idSHz8IftU1Mk2LRq5yWErtYZxD0_ivs', '2024-01-29 06:11:00', '2024-01-29 07:11:00', '2024-01-29 06:11:00', '2024-01-29 06:11:00'),
(3, '\"lZwtp2t0N2IRryIizQis52iQp5kqWStL\"', 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDY1MTMyNDgsImV4cCI6MTcwNjUxNjg0OH0.iC9bJVPiM2qHpdMVk_Ndoi9WslVsXQZ_cbgKnoPISrI', '2024-01-29 07:27:28', '2024-01-29 08:27:28', '2024-01-29 07:27:28', '2024-01-29 07:27:28'),
(4, '\"lZwtp2t0N2IRryIizQis52iQp5kqWStL\"', 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDY1MTMyNzMsImV4cCI6MTcwNjUxNjg3M30.IrDbnnrZoDcQjWrRCUJCqsVhHHErSFzQvy4gGk7rVXk', '2024-01-29 07:27:53', '2024-01-29 08:27:53', '2024-01-29 07:27:53', '2024-01-29 07:27:53'),
(5, '\"JLTNpzvBH-zCwuzF1q6W_9GggtpjRrbl\"', 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDY1MTM1NTksImV4cCI6MTcwNjUxNzE1OX0.Vh7Ai4We7Sxd3SWCl82D27hJ1ggpf8R1muH63k273Yc', '2024-01-29 07:32:39', '2024-01-29 08:32:39', '2024-01-29 07:32:39', '2024-01-29 07:32:39'),
(6, '\"S5UlGMIDCbTqYWUsxG2RQ6JvAiCRIGfh\"', 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDY1MTcxODcsImV4cCI6MTcwNjUyMDc4N30.KQAfk8Lqcxp05HV30WGSu5x-noZ9Zgx752am8k0PH-E', '2024-01-29 08:33:07', '2024-01-29 09:33:07', '2024-01-29 08:33:07', '2024-01-29 08:33:07'),
(7, '\"S5UlGMIDCbTqYWUsxG2RQ6JvAiCRIGfh\"', 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDY1MTcyNjMsImV4cCI6MTcwNjUyMDg2M30.MHvbDkg6MggBZMDlOIi2w8OMeUGnOEABXZPalMtczFc', '2024-01-29 08:34:23', '2024-01-29 09:34:23', '2024-01-29 08:34:23', '2024-01-29 08:34:23'),
(8, '\"S5UlGMIDCbTqYWUsxG2RQ6JvAiCRIGfh\"', 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDY1MTcyODcsImV4cCI6MTcwNjUyMDg4N30.0k9cGZN0H7bTcrGRfgqOgdJch3x0vUIw8Bt8lOHAU0w', '2024-01-29 08:34:47', '2024-01-29 09:34:47', '2024-01-29 08:34:47', '2024-01-29 08:34:47'),
(9, '\"WtSm9t4IKow1lefxUTLCr22ybm-urLI3\"', 14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE3MDY1MzU3MTcsImV4cCI6MTcwNjUzOTMxN30.N1_sRCAlOUP2C447kgKZVgBbVD7XtLvufF85LG-cPq8', '2024-01-29 13:41:57', '2024-01-29 14:41:57', '2024-01-29 13:41:57', '2024-01-29 13:41:57'),
(10, '\"J1wzSJIUHaJmcSEQYsNFJGlSY8nomlHV\"', 14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE3MDY1OTQ0MzQsImV4cCI6MTcwNjU5ODAzNH0.1FIKeBPTBgikCrIKrOJTuHZWd9vX9wvTBRT7zhm0ksM', '2024-01-30 06:00:34', '2024-01-30 07:00:34', '2024-01-30 06:00:34', '2024-01-30 06:00:34'),
(11, '\"C58trbhlBqG_kPdIIw3Sm1V39LtEvewo\"', 14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE3MDY2MDg4NzAsImV4cCI6MTcwNjYxMjQ3MH0.F8MKZGmnNzjINp1S1_Ns8flE1J-SGY_JX8Z5KEW7JDY', '2024-01-30 10:01:10', '2024-01-30 11:01:10', '2024-01-30 10:01:10', '2024-01-30 10:01:10'),
(12, '\"ygRfwLEG6G5xwGuPyceEYft5xgVf5ia-\"', 15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE3MDY2MDk3ODEsImV4cCI6MTcwNjYxMzM4MX0.s_aEi8KXPjS_leTIEVXpg96Ax9OZOwuWZPx-kFbZo1k', '2024-01-30 10:16:21', '2024-01-30 11:16:21', '2024-01-30 10:16:21', '2024-01-30 10:16:21'),
(13, '\"sZcrdwWXhxVlo8bN5UPbPBdADM28wecF\"', 16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE3MDY2MTI1NTQsImV4cCI6MTcwNjYxNjE1NH0.iFxeDENzQ-Id5MZs0miWEVrPKNnD8T89CY6F8xVysCc', '2024-01-30 11:02:34', '2024-01-30 12:02:34', '2024-01-30 11:02:34', '2024-01-30 11:02:34'),
(14, '\"aNHyxUptFN4tRrJqCIgh7vjHu3qFOCKI\"', 14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE3MDY2MTMwMTksImV4cCI6MTcwNjYxNjYxOX0.kiq4BMrOFpL8hSE0Ua0A8EKenYZhEHXrLlSKT8nVIHs', '2024-01-30 11:10:19', '2024-01-30 12:10:19', '2024-01-30 11:10:19', '2024-01-30 11:10:19'),
(15, '\"uScGixNbGikmw0uNU2r05h2jzz3sfox1\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY2ODIwODUsImV4cCI6MTcwNjY4NTY4NX0.D0S5fowPDhSy7CGoeiZHaVyFyXBvDSTihVkeHLmsDmc', '2024-01-31 06:21:25', '2024-01-31 07:21:25', '2024-01-31 06:21:25', '2024-01-31 06:21:25'),
(16, '\"Pxng7StCi9vKtsbiFIO_CrrbUxbp0lLx\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY2ODM1NjUsImV4cCI6MTcwNjY4NzE2NX0.5Ysv4FZef7VVeC3Dw5obktxGYehi4bgSZspTcHbGvm4', '2024-01-31 06:46:05', '2024-01-31 07:46:05', '2024-01-31 06:46:05', '2024-01-31 06:46:05'),
(17, '\"kTCQlHXLFu2npppRrwTwie3V829uSmwF\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY2ODU0MjQsImV4cCI6MTcwNjY4OTAyNH0.TbpP4zZUS4nPqDSE5legU8bKWypZJxYSclhph3ceYX8', '2024-01-31 07:17:04', '2024-01-31 08:17:04', '2024-01-31 07:17:04', '2024-01-31 07:17:04'),
(18, '\"vepWsqYAOnHXKOan2iAVv883hDavCi1g\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY2ODk0MDcsImV4cCI6MTcwNjY5MzAwN30.BoaNk5-I3wypZhztnYzX9BUmwdsbN3Q5-qMhwCf5ElI', '2024-01-31 08:23:27', '2024-01-31 09:23:27', '2024-01-31 08:23:27', '2024-01-31 08:23:27'),
(19, '\"DkChxJfL0zQ4zl5JLoUBilRi8pd0Zn85\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY2OTA4ODYsImV4cCI6MTcwNjY5NDQ4Nn0.39lxgTmeonFxVWI6DAJDVGmTw7cW_L43BlEWMReZvnw', '2024-01-31 08:48:06', '2024-01-31 09:48:06', '2024-01-31 08:48:06', '2024-01-31 08:48:06'),
(20, '\"0haSZpgH9tVZMLVpdAp8HuZCxA802pWu\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY2OTI3NjgsImV4cCI6MTcwNjY5NjM2OH0.XucOC9ISwi86Y1dkdJFDgTWISu-FlK2KrpnKBxklkVM', '2024-01-31 09:19:28', '2024-01-31 10:19:28', '2024-01-31 09:19:28', '2024-01-31 09:19:28'),
(21, '\"NU--Pdncb7LsZAge0qZJA6-JoLb-vbFR\"', 18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE3MDY3MDgyMTEsImV4cCI6MTcwNjcxMTgxMX0.HcUfHk4gI4gHC4SBEVedUS4vGGdAbwxXeF1YAPQxQC8', '2024-01-31 13:36:51', '2024-01-31 14:36:51', '2024-01-31 13:36:51', '2024-01-31 13:36:51'),
(22, '\"b6cONEJVixrRcaL-3MRuZOdG6DDL8p9O\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY3ODcwMzksImV4cCI6MTcwNjc5MDYzOX0.OClmanktJcUCVX5FzTYqb3VxXJrM0gaLCmq05i09K0g', '2024-02-01 11:30:39', '2024-02-01 12:30:39', '2024-02-01 11:30:39', '2024-02-01 11:30:39'),
(23, '\"_-Zbo_XDgLlpwdPaPrl8yeOpfqoJYmla\"', 19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJpYXQiOjE3MDY3ODgwNjcsImV4cCI6MTcwNjc5MTY2N30.xpoCuvazLx3ooe7CKr5KgnPdSkWFAor3GzII_NibP2U', '2024-02-01 11:47:47', '2024-02-01 12:47:47', '2024-02-01 11:47:47', '2024-02-01 11:47:47'),
(24, '\"biEN4mkyg41zE1RFaSzj-_spiIv48XjD\"', 19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJpYXQiOjE3MDY3ODgzMjQsImV4cCI6MTcwNjc5MTkyNH0.xNGwRNFrGIOY3Cmn4U3p3ReRe812twAdwRJMQmXOc64', '2024-02-01 11:52:04', '2024-02-01 12:52:04', '2024-02-01 11:52:04', '2024-02-01 11:52:04'),
(25, '\"GAJQOzFJKbVm2ZwBbdHQOyPzNLOzDOCV\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY4NTM2NzMsImV4cCI6MTcwNjg1NzI3M30.n4rlMA3LBiCVuZy1Y3ljPdG7IlgqvhMw9DybjxfXQvQ', '2024-02-02 06:01:13', '2024-02-02 07:01:13', '2024-02-02 06:01:13', '2024-02-02 06:01:13'),
(26, '\"Pb4WoEcgWMUOZdGG7DhaC8wv9SxZiHtQ\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDY4NzI4NTUsImV4cCI6MTcwNjg3NjQ1NX0.Dgqa8hfHLQ9s7bX-uzZBCbGXQg0Mg2JrIq9TzOjUAr8', '2024-02-02 11:20:55', '2024-02-02 12:20:55', '2024-02-02 11:20:55', '2024-02-02 11:20:55'),
(27, '\"16hdy1VwRmQ_6UAmaYTB7xIe4LJdWfLW\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDcxMTI3NTcsImV4cCI6MTcwNzExNjM1N30.Uq9qOZWjzBN0qwzCuu9TrpZeFXS1UzYr2DSJILrAqH0', '2024-02-05 05:59:17', '2024-02-05 06:59:17', '2024-02-05 05:59:17', '2024-02-05 05:59:17'),
(28, '\"bh56WvT9UkcaXpvLuc49EW4b4jaDpZaL\"', 20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIwLCJpYXQiOjE3MDcyODQzNDcsImV4cCI6MTcwNzI4Nzk0N30.sjkPXXFAheNjm-hApfiMW_moXK2g42dcJn8sF1-UdFE', '2024-02-07 05:39:07', '2024-02-07 06:39:07', '2024-02-07 05:39:07', '2024-02-07 05:39:07'),
(29, '\"ng5qNiy3uKGQDy-zmRhDvmHQmzAzHfLD\"', 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE3MDcyOTYyNjUsImV4cCI6MTcwNzI5OTg2NX0.mvAdag9uU_rilpn8aRI59hRVfkQAVG2a4bOyvodxsGI', '2024-02-07 08:57:45', '2024-02-07 09:57:45', '2024-02-07 08:57:45', '2024-02-07 08:57:45'),
(30, '\"u9rh1N-4MGIJYdYDDNo8d1S59a4kxykG\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDcyOTg5MjcsImV4cCI6MTcwNzMwMjUyN30.zBROn_58oqu1nbn_aay_fXVVgwZ4W3grsvsIguzxjlg', '2024-02-07 09:42:07', '2024-02-07 10:42:07', '2024-02-07 09:42:07', '2024-02-07 09:42:07'),
(31, '\"0l5Ftj-XGYckjs3Hq_rY1n23huoyaxKe\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDczMDA3NDIsImV4cCI6MTcwNzMwNDM0Mn0.MxRXu9eM6iBJ6ezwpN-f74LehyDcnuxpRdTqA0j-zhA', '2024-02-07 10:12:22', '2024-02-07 11:12:22', '2024-02-07 10:12:22', '2024-02-07 10:12:22'),
(32, '\"eZmXtH8G3uJFpflN1MNmzhWdtyEo7Xt3\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDc0NTc0MDEsImV4cCI6MTcwNzQ2MTAwMX0.NUZ77b-b9PTJiId-9bvk3Xtr-pRojQPInhd4JV9j5qE', '2024-02-09 05:43:21', '2024-02-09 06:43:21', '2024-02-09 05:43:21', '2024-02-09 05:43:21'),
(33, '\"0uogOMsESIZMoLfLANsxQKq9jMqi05Wk\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDc0NTk1OTQsImV4cCI6MTcwNzQ2MzE5NH0.PtEarwA_Z7PF3L_5f43eQMDso9ynNL0mzD8cnk9tCEE', '2024-02-09 06:19:54', '2024-02-09 07:19:54', '2024-02-09 06:19:54', '2024-02-09 06:19:54'),
(34, '\"728GdY7Ew1yBLx1Xb9Wy0ZOM2CgmxS7x\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDc0NzA1NTUsImV4cCI6MTcwNzQ3NDE1NX0.YzWZ38gpbQfbq1MzbTeECQjEN3EAc1bOdRzVY6jFojc', '2024-02-09 09:22:35', '2024-02-09 10:22:35', '2024-02-09 09:22:35', '2024-02-09 09:22:35'),
(35, '\"o9dBb3cY9oqs6y6AzNix2igWaIRK5Ona\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDc0NzU0MjcsImV4cCI6MTcwNzQ3OTAyN30.UKMpRwTSdTm9eq5L-NRsPxEjPqfdrNSq36dbhglE7pU', '2024-02-09 10:43:47', '2024-02-09 11:43:47', '2024-02-09 10:43:47', '2024-02-09 10:43:47'),
(36, '\"VrGInEg6rLaWyXjenZXp6wb-1dyJ8Ve1\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDc0Nzc0NjgsImV4cCI6MTcwNzQ4MTA2OH0.pSMNwmvuRJC4t5Bz5HY7hyUlolr7pf4JRD_e1R29H90', '2024-02-09 11:17:48', '2024-02-09 12:17:48', '2024-02-09 11:17:48', '2024-02-09 11:17:48'),
(37, '\"LhpoisbBciDSByMC-JEP3LSu1fZeipvg\"', 17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJpYXQiOjE3MDc5OTU1NTksImV4cCI6MTcwNzk5OTE1OX0.qtz8h-j0KArX-2H90yBtrCFRxRXb6VhhxQwuZNZN17M', '2024-02-15 11:12:39', '2024-02-15 12:12:39', '2024-02-15 11:12:39', '2024-02-15 11:12:39'),
(38, '\"IboBw_r9YHPZg9dOjwhT_CMh093VGlji\"', 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3MDkxMDI4NDMsImV4cCI6MTcwOTEwNjQ0M30.uzszNTe8SqHTx7qtauOOSoeVj1q5NQiVu6ixEA2-eas', '2024-02-28 06:47:23', '2024-02-28 07:47:23', '2024-02-28 06:47:23', '2024-02-28 06:47:23'),
(39, '\"R-pZMUZOpYVFGkKyDLVrhj_W8-eFMNzm\"', 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3MDkxMDQxOTQsImV4cCI6MTcwOTEwNzc5NH0.De65OHX0K8ZCmq8JLCfgEnhEo_vK_SZaeguhuakfA5I', '2024-02-28 07:09:54', '2024-02-28 08:09:54', '2024-02-28 07:09:54', '2024-02-28 07:09:54'),
(40, '\"2FtEiFWKPfXacIicswveoHmLjTEL-g0m\"', 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3MDkxMDk1NDAsImV4cCI6MTcwOTExMzE0MH0.eyuDF6zLbglxz98uG1Ge9pWHqiqw8GuJYKKI6H44cTU', '2024-02-28 08:39:00', '2024-02-28 09:39:00', '2024-02-28 08:39:00', '2024-02-28 08:39:00'),
(41, '\"02XLKJ0howzGpJwhU8guf9wL1PsegtsN\"', 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3MDkxODY0NDEsImV4cCI6MTcwOTE5MDA0MX0.7y5e_0zR3mymyNTxOyRnDfCaLwHD1Gqvb5Rfwq-UJLA', '2024-02-29 06:00:41', '2024-02-29 07:00:41', '2024-02-29 06:00:41', '2024-02-29 06:00:41'),
(44, '\"3ERAwNUzMM_xigv6mIoXPWOX79Hh_59g\"', 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3MDkxOTY4NTAsImV4cCI6MTcwOTIwMDQ1MH0.p0MGgaxnsI8Ol_QAvVkWWMp4mSqAhLg1iwQ21twVUUU', '2024-02-29 08:54:10', '2024-02-29 09:54:10', '2024-02-29 08:54:10', '2024-02-29 08:54:10'),
(46, '\"Epg5PlMPh9bug2q4s-Fdpj9dNAxnIOH8\"', 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3MDkyMDA3NDYsImV4cCI6MTcwOTIwNDM0Nn0.Up4WWssrFTwgCRcWzWI-kkZiOHd3OwDGmT4YZbIberI', '2024-02-29 09:59:06', '2024-02-29 10:59:06', '2024-02-29 09:59:06', '2024-02-29 09:59:06'),
(49, '\"Oxa8gX5kARGC-NndYYVgPcAzMzB8kPYD\"', 23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJpYXQiOjE3MDkyMDkyNTUsImV4cCI6MTcwOTIxMjg1NX0.Gxag9REil4PGngPxHd0P6GRfGMOotO9s9-_nqaWEPiA', '2024-02-29 12:20:55', '2024-02-29 13:20:55', '2024-02-29 12:20:55', '2024-02-29 12:20:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `contactNO` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `motherName` varchar(20) DEFAULT NULL,
  `fatherName` varchar(20) DEFAULT NULL,
  `education` varchar(40) DEFAULT NULL,
  `pic_location` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `contactNO`, `email`, `password`, `createdAt`, `updatedAt`, `motherName`, `fatherName`, `education`, `pic_location`, `role`) VALUES
(1, 'Saif', '9998887887', 'saif@gmail.com', '$2b$10$onPbmN3M2EPr66dwZW1cFOqnGeWhcgMly8iSW2ToNu87oJUiUS1.6', '2024-01-16 07:16:31', '2024-01-16 07:16:31', NULL, NULL, NULL, NULL, 0),
(2, 'Shrishti', '8006714177', 'shrishtibaliyan11@gmail.com', 'shri987@', '2021-01-24 00:00:00', '2024-01-30 10:01:31', 'Rashmi', 'Anuj kumar', 'Post Graduated', NULL, 0),
(3, 'Upkar', '7878787878', 'upkar12@gmail.com', 'upkar345!', '2024-01-21 08:42:27', '2024-01-21 08:42:27', NULL, NULL, NULL, NULL, 0),
(4, 'Alka', '2345677891', 'alka2@gmail.com', 'alkaxyz0', '2024-01-23 08:20:01', '2024-01-23 08:20:01', NULL, NULL, NULL, NULL, 0),
(5, 'Anuj kumar', NULL, 'anujkumar12@gmail.com', 'anuj9871', '2024-01-27 17:43:12', '2024-01-27 17:43:12', NULL, NULL, NULL, NULL, 0),
(6, 'Rashmi', NULL, 'rashmi98@gmail.com', '$2b$10$hyAA5ERqUYr.ptPHvjybtOsFClXVb6IFmq4GW4NCtIW20DxHFm/Iq', '2024-01-29 05:26:07', '2024-01-29 05:26:07', NULL, NULL, NULL, NULL, 0),
(7, 'Adil', NULL, 'adil@gmail.com', '$2b$10$2xP5BYXRsMH5qSz5ciwiX.qN5Dkv6ZdxbthVH0wGnsTdeKWB6qqiK', '2024-01-29 05:36:48', '2024-01-29 05:36:48', NULL, NULL, NULL, NULL, 0),
(8, 'Asif', NULL, 'asif@gmail.com', '$2b$10$11/IDVfwYyAUY.WRPI5ZROEBCjFs6nwXYTXXp4MyD4wPK5M7dEjPO', '2024-01-29 06:07:47', '2024-01-29 06:07:47', NULL, NULL, NULL, NULL, 0),
(9, 'Daksh', NULL, 'daksh76@gmail.com', '$2b$10$pjnaORcUu4rydSU7V74rnOHVZ7FT.w863rUcTcHSAQNHHKGEE5/hK', '2024-01-29 06:25:31', '2024-01-29 06:25:31', NULL, NULL, NULL, NULL, 0),
(10, 'Ashish', NULL, 'ashish9@gmail.com', '$2b$10$fEcOzyNrBNWG9xyJBMTDAOOldANBEpXlKrmuOlCZ9.TATbWY6780S', '2024-01-29 07:18:58', '2024-01-29 07:18:58', NULL, NULL, NULL, NULL, 0),
(11, 'Ajay', NULL, 'ajay9@gmail.com', '$2b$10$l8EIyp4cdGeZm1EMBUJCJeIP1sygqnSSOMdjwyFGxLr2Dosa.cYPC', '2024-01-29 07:29:31', '2024-01-29 07:29:31', NULL, NULL, NULL, NULL, 0),
(12, '', NULL, '', '$2b$10$xQrgeFyvsE9EffxpYJ1.decu1mTYKqQh33q7HwF8omenZhA4FiWRS', '2024-01-29 07:30:10', '2024-01-29 07:30:10', NULL, NULL, NULL, NULL, 0),
(13, 'Karishma', NULL, 'karishma@gmail.com', '$2b$10$ZFG3gRyp.sYl7T0/Qba.1e9mNURoV1y/a0s9PAgvvifO6VmVT.i.a', '2024-01-29 08:42:12', '2024-01-29 08:42:12', NULL, NULL, NULL, NULL, 0),
(14, 'sharshti', NULL, 'sharshti@gmail.com', '$2b$10$u/ljrjCYX1LmJqKNxwAVb.jor0ogl9O58w067mUHx2hCLtXMSY8Py', '2024-01-29 13:41:31', '2024-01-29 13:41:31', NULL, NULL, NULL, NULL, 0),
(15, 'Anjali', NULL, 'anjali1@gmail.com', '$2b$10$dseSsqIV88ph51k4lYHhxee09ZI2siWBfQCmRiGfS57Uiver4HubC', '2024-01-30 10:16:00', '2024-01-30 10:16:00', NULL, NULL, NULL, NULL, 0),
(16, 'Ayushi', NULL, 'ayushi0@gmail.com', '$2b$10$O2oPNBTWRMCGcfa4R0N/4ODKKDuKOmN25Zv4i4xLIbOwOXixcbPX6', '2024-01-30 11:02:18', '2024-01-30 11:02:18', NULL, NULL, NULL, NULL, 0),
(17, 'Tanvi ', '990000078', 'tanvi2@gmail.com', '$2b$10$uZ1hJF4Rso3U4QKH5jblDOHnPLKJK4rol8Ks0Xcf80D3kAua3OcR.', '2024-01-31 06:21:08', '2024-02-15 12:01:21', 'Usha ', 'Umesh kumar', 'Graduated', NULL, 0),
(18, 'Aayush', '9898989989', 'aayush1@gmail.com', '$2b$10$6v4crtwn59VSJ58YPX.m6.xnTgrnE4XBK6OIVELG.ORF0TeD0nfQe', '2024-01-31 13:36:31', '2024-01-31 13:39:09', NULL, NULL, NULL, NULL, 0),
(19, 'Alka', '9999999999', 'alka1@gmail.com', '$2b$10$gjLnBaXnEEDHEjEqi1fHtel5xEHMCGl9Zd/qpGuNasEMuWmbPphhy', '2024-02-01 11:47:24', '2024-02-01 11:49:21', NULL, NULL, NULL, NULL, 0),
(20, 'Sagar', NULL, 'sagarsaini@gmail.com', '$2b$10$MHfUUv337qMD0iBmqAtG3OL/IegtBOtUqjhdMiQf9kvpnPO47TgxC', '2024-02-07 05:38:47', '2024-02-07 05:38:47', NULL, NULL, NULL, NULL, 0),
(21, 'Tushar', NULL, 'tushar@gmail.com', '$2b$10$2/lNJLg.Lmig1SnxvrNIfeWzO2sJWXKixuRZEfIKBEkwaAyN0u7Fi', '2024-02-07 08:54:30', '2024-02-07 08:54:30', NULL, NULL, NULL, NULL, 0),
(22, 'Vanshika 1', '8767563426', 'vanshika1@gmail.com', '$2b$10$aPaBtoz6KD/G4Jlp56a9M.MNBEQsItj82eHlTtp1f/5IoULp6y6he', '2024-02-28 06:47:08', '2024-02-29 09:58:31', 'Usha devi', 'Sanjeev kumar', NULL, NULL, 0),
(23, 'Saif A Ansari', '7309172222', 's@gmail.com', '$2b$10$WArLlDNWTwP30/J7rQpjD.sWsCjp5ife3MU0y5boiJedX/QvtaDzq', '2024-02-29 12:10:57', '2024-02-29 12:20:36', NULL, NULL, 'Masters', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
