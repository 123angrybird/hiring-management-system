-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2023 at 03:13 PM
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
-- Database: `corpu`
--
CREATE DATABASE IF NOT EXISTS `corpu` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `corpu`;

-- --------------------------------------------------------

--
-- Table structure for table `applied_unit`
--

DROP TABLE IF EXISTS `applied_unit`;
CREATE TABLE IF NOT EXISTS `applied_unit` (
  `applier_id` int(11) NOT NULL,
  `unit_id` varchar(11) NOT NULL,
  `apply_date` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`applier_id`,`unit_id`),
  KEY `unit_id` (`unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applied_unit`
--

INSERT INTO `applied_unit` (`applier_id`, `unit_id`, `apply_date`) VALUES
(34, 'cos60010', '2023-05-08'),
(34, 'cos80001', '2023-05-31'),
(35, 'cos60010', '2023-05-17'),
(35, 'cos80001', '2023-05-15'),
(35, 'cos80022', '2023-05-15'),
(44, 'cos60010', '2023-05-18');

-- --------------------------------------------------------

--
-- Table structure for table `applier`
--

DROP TABLE IF EXISTS `applier`;
CREATE TABLE IF NOT EXISTS `applier` (
  `applierID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`applierID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applier`
--

INSERT INTO `applier` (`applierID`, `name`, `email`, `pass`, `phone`, `address`, `age`, `gender`, `qualification`, `schedule`) VALUES
(1, 'Ky Vu', 'vuky9999@gmail.com', '1234567890', '0415739006', '24 Wakefield st', 22, 'M', 'Master of Information Technology (Professional computing)\nmajor in Software Development', 'Monday,Tuesday,Wednesday'),
(34, 'Join', 'aaa@s.com', '1234567890', '01234567890', '20 aaaaaaaa', 22, 'M', 'Master of IT', 'Monday, Tuesday'),
(35, 'Ken', 'tts@asd.com', '1234567890', NULL, NULL, NULL, NULL, NULL, NULL),
(44, 'bot', 'a@gmail.com', '1234567890', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
CREATE TABLE IF NOT EXISTS `unit` (
  `unit_id` varchar(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` enum('Monday','Tuesday','Wednesday','Thursday','Friday') DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`unit_id`, `name`, `description`, `date`, `time`) VALUES
('cos20007', 'Object Oriented Programming', 'The overall aim of this unit is to learn the fundamentals of Object Oriented Design, and apply these in development of Object Oriented programs using a modern OO language, thus, by the end of this unit you should be able to:\r\n<ol>\r\n<li>Explain the principles of the object oriented programming paradigm specifically including abstraction, encapsulation, inheritance and polymorphism</li>\r\n\r\n<li>Use an object oriented programming language, and associated class libraries, to develop object oriented programs</li>\r\n\r\n<li>Design, develop, test, and debug programs using object oriented principles in conjuncture with an integrated development environment</li>\r\n\r\n<li>Construct appropriate diagrams and textual descriptions to communicate the static structure and dynamic behaviour of an object oriented solution</li>\r\n\r\n<li>Describe and explain the factors that contribute to a good object oriented solution, reflecting on your own experiences and drawing upon accepted good practices</li>\r\n\r\n</ol>', 'Wednesday', '13:00-15:30'),
('cos30008', 'Data Structures and Patterns', 'COS30008 – Data Structures and Patterns studies the design, implementation, and application of data structures as a means for algorithmic problem solving. Each problem exhibits specific characteristics with respect to resource requirements, data representation, and software architecture. ', 'Wednesday', '14:30-16:00'),
('cos60010', 'Technology Inquiry Project', 'This is a project-based unit in which students work in teams to enquire and solve one or\r\nmore challenges specifically designed and oriented towards technology. The project(s) must\r\nhave a substantial emphasis on programming. Teams of students will have a staff member\r\nas a ‘facilitator’ whilst working on these projects.', NULL, NULL),
('cos80001', 'Cloud Computing Architecture', 'The overall aim of this unit is to learn generic principles of \"everything as a service\" in cloud computing, plus practical work doing design and development for one or more contemporary platforms, which may vary from year to year. Cloud computing undergoes constant evolution, and there are several competing platforms, such as Amazon Web Services (AWS) and Oracle Cloud Infrastructure (OCI).  This semester in this unit we will use Amazon Web Services (AWS) for the first half of semester, and then Oracle Cloud Infrastructure (OCI) for weeks 7-10, and then we will finish the semester with Multi-Cloud.', NULL, NULL),
('cos80022', 'Software Quality and Testing', 'COS80022 is a 12-week unit with the concurrent pre-requisite COS60010. The overall aim of this unit is to expose students to techniques for realising high quality of contemporary software systems using a range of activities in the lifecycle of software engineering, including requirements, planning, and testing. ', NULL, NULL),
('swe30011', 'IoT Programming', 'The Internet of Things (IoT) Programming unit will teach you the fundamentals for developing simple IoT-based solutions for applications such as,  Smart Homes, Smart Cities, etc., using IoT sensors and devices. In this course you will learn the skills to work with current popular IoT sensor and platforms such as Arduino and will have the opportunity to apply these skills in developing innovative IoT-based system.', 'Tuesday', '10:00-12:30');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applied_unit`
--
ALTER TABLE `applied_unit`
  ADD CONSTRAINT `applied_unit_ibfk_1` FOREIGN KEY (`applier_id`) REFERENCES `applier` (`applierID`),
  ADD CONSTRAINT `applied_unit_ibfk_2` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`unit_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
