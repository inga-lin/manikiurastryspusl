-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2022 at 02:35 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manikiuras`
--

-- --------------------------------------------------------

--
-- Table structure for table `komentarai`
--

CREATE TABLE `komentarai` (
  `id` int(11) NOT NULL,
  `salonas_id` int(10) UNSIGNED NOT NULL,
  `komentarai` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `salonas`
--

CREATE TABLE `salonas` (
  `id` int(10) UNSIGNED NOT NULL,
  `vardas` varchar(50) NOT NULL,
  `tipas` tinyint(3) UNSIGNED NOT NULL,
  `kaina` decimal(4,2) NOT NULL,
  `trukme` decimal(4,2) NOT NULL,
  `nuotrauka` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salonas`
--

INSERT INTO `salonas` (`id`, `vardas`, `tipas`, `kaina`, `trukme`, `nuotrauka`) VALUES
(19, 'kamile', 2, '60.00', '60.00', ''),
(63, 'aiste', 1, '10.00', '20.00', NULL),
(64, 'barbora', 1, '40.00', '10.00', NULL),
(66, 'Mantas', 2, '30.00', '2.00', NULL),
(85, 'doli', 2, '10.00', '1.00', NULL),
(86, 'dddd', 1, '25.00', '25.00', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `komentarai`
--
ALTER TABLE `komentarai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salonas_id` (`salonas_id`);

--
-- Indexes for table `salonas`
--
ALTER TABLE `salonas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `komentarai`
--
ALTER TABLE `komentarai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `salonas`
--
ALTER TABLE `salonas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `komentarai`
--
ALTER TABLE `komentarai`
  ADD CONSTRAINT `komentarai_ibfk_1` FOREIGN KEY (`salonas_id`) REFERENCES `salonas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
