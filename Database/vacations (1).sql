-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2023 at 03:02 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(16, 17),
(15, 2),
(1, 1),
(15, 8);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastname`, `email`, `password`, `roleId`) VALUES
(1, 'alex', 'samih', 'mail@mail.ru', '123456', 2),
(15, 'Anna-new2', 'Veks2', 'anna2@veks.co.il', '06d700ebb7e452b52749bdf9b84813b24431aa0ebbf7f07761a4b1bd1b2c2e5c64122e9bef3aff69e1af7ab11af98a68e6b13ecce2cea44037364b525e3de954', 1),
(16, 'admin', 'admin', 'admin', '921e1a200225cfd3a67a6f2ae57f8a6e1e12e57dda87e53df79eb1cd3f3fc019486380af4c1407daa01659965256be26b78a2d5247da3c2a87990b32b6da84a7', 2),
(17, 'alex2', 'samih-zade', 'alex@mail.ru', '06d700ebb7e452b52749bdf9b84813b24431aa0ebbf7f07761a4b1bd1b2c2e5c64122e9bef3aff69e1af7ab11af98a68e6b13ecce2cea44037364b525e3de954', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageFileName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageFileName`) VALUES
(1, 'Las Vegas, USA', 'Come to Sin City, where you can lose all your money, drink too much, and get married to a stranger all in one night!', '2023-06-13 00:00:00', '2023-06-27 00:00:00', '250.00', 'f8c5eedb-3655-42ba-a6e2-5ada083ee262.jpg'),
(2, 'Amsterdam, Netherlands', 'The city where you can rent a bike, get high, and tour museums all in the same day.', '2023-07-30 00:00:00', '2023-08-12 00:00:00', '120.00', '6d9fc8d0-0c8d-49fb-9ede-5f151b731595.jpg'),
(3, 'Sydney, Australia', 'Come to the land Down Under, where the beaches are beautiful, the wildlife is dangerous, and the people all sound like Steve Irwin.', '2023-07-18 00:00:00', '2023-07-27 00:00:00', '150.00', '3475335e-be51-49f2-81e6-931f63556602.jpg'),
(4, 'Bangkok, Thailand', 'A city of contrasts: ancient temples and modern malls, street food and five-star restaurants, and traffic that will make you question the meaning of life.', '2023-04-19 00:00:00', '2023-04-26 00:00:00', '80.00', 'dc35d06b-70be-44fa-b04a-42fca85542d2.jpg'),
(6, 'Moscow, Russia', 'A city where the winters are colder than your ex\'s heart, and the summers are hotter than a Russian sauna. Come for the onion-domed churches, stay for the vodka and borscht. Make sure to practice your best \"nyet\" and bundle up!', '2023-07-31 00:00:00', '2023-08-20 00:00:00', '300.00', '5e17fce4-c3e1-4d26-876c-c80179a5e6ae.jpg'),
(8, 'St Petersburg, Russia', 'St. Petersburg - the city that\'s like a Russian nesting doll. It\'s beautiful on the outside, but you never know what you\'re going to get on the inside. One minute you\'re admiring the stunning architecture, and the next minute you\'re lost in a maze of confusing streets. It\'s a city where the weather is always cold, but the vodka is always warm. So grab your fur hat and your favorite bottle of Stoli, and get ready to explore the city where the streets have more twists and turns than a Russian nove', '2023-04-21 00:00:00', '2023-05-28 00:00:00', '299.00', '3cd25764-e30d-4ac3-bdfc-97a740fcacc5.jpg'),
(16, 'Verona, Italy', 'Verona is a charming city located in the north of Italy, known for its romantic ambiance, beautiful architecture, and fascinating history. Famous for being the setting of Shakespeare\'s \'Romeo and Juliet,\' Verona has a wealth of attractions to explore, from ancient Roman ruins to medieval castles and churches. Visitors can stroll through the winding streets of the old town, admire the stunning Piazza Bra, or visit the iconic Verona Arena, an impressive Roman amphitheater. Verona is also renowned ', '2023-09-21 00:00:00', '2023-09-26 00:00:00', '200.00', 'verona.jpg'),
(17, 'Istanbul, Turkey', 'Istanbul is a vibrant and cosmopolitan city in Turkey that straddles Europe and Asia, making it a unique blend of cultures and traditions. With its rich history and architecture, Istanbul offers a wealth of attractions, including the stunning Hagia Sophia, the opulent Topkapi Palace, and the iconic Blue Mosque. The city also boasts bustling bazaars and markets, such as the Grand Bazaar and Spice Market, where visitors can shop for traditional Turkish goods and sample local cuisine. The Bosphorus', '2023-09-20 00:00:00', '2023-09-25 00:00:00', '233.00', '817deee3-1598-4976-9b6a-3574cc73328e.jpg'),
(18, 'San Francisco, USA', 'San Francisco is a vibrant city in Northern California known for its stunning scenery, diverse neighborhoods, iconic landmarks like the Golden Gate Bridge and Alcatraz Island, and rich cultural offerings including food, art, and music.', '2023-04-18 00:00:00', '2023-05-18 00:00:00', '350.00', '85fc8081-8688-41a1-9c5c-2828d5d7256d.jpg'),
(19, 'Tokyo, Japan', 'Tokyo is a bustling city in Japan that seamlessly blends the traditional and the modern. Visitors can explore ancient temples and shrines, experience traditional Japanese culture, and indulge in delicious cuisine, while also enjoying cutting-edge technology and entertainment. Tokyo is known for its unique fashion, anime and manga culture, and vibrant nightlife. With its fast-paced energy and endless attractions, Tokyo is a must-visit destination for anyone looking for a truly immersive and unfor', '2023-04-28 00:00:00', '2023-05-09 00:00:00', '400.00', '5f7b7469-4a94-4ac8-8f1c-a7deb7d07500.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
