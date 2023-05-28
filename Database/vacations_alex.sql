-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2023 at 09:56 AM
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
(29, 9),
(29, 6),
(29, 3),
(29, 1),
(29, 4),
(28, 9),
(28, 6),
(28, 5),
(28, 3),
(28, 7),
(31, 6),
(31, 1),
(31, 4),
(31, 10),
(32, 6),
(32, 10),
(32, 11),
(32, 5),
(32, 8),
(30, 6),
(30, 1),
(30, 2),
(30, 8);

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
(27, 'admin', 'admin', 'admin@gmail.com', '921e1a200225cfd3a67a6f2ae57f8a6e1e12e57dda87e53df79eb1cd3f3fc019486380af4c1407daa01659965256be26b78a2d5247da3c2a87990b32b6da84a7', 1),
(28, 'Homer', 'Simpson', 'homer@gmail.com', '06d700ebb7e452b52749bdf9b84813b24431aa0ebbf7f07761a4b1bd1b2c2e5c64122e9bef3aff69e1af7ab11af98a68e6b13ecce2cea44037364b525e3de954', 2),
(29, 'Bart', 'Simpson', 'bart@gmail.com', '06d700ebb7e452b52749bdf9b84813b24431aa0ebbf7f07761a4b1bd1b2c2e5c64122e9bef3aff69e1af7ab11af98a68e6b13ecce2cea44037364b525e3de954', 2),
(30, 'Lisa', 'Simpson', 'lisa@gmail.com', '06d700ebb7e452b52749bdf9b84813b24431aa0ebbf7f07761a4b1bd1b2c2e5c64122e9bef3aff69e1af7ab11af98a68e6b13ecce2cea44037364b525e3de954', 2),
(31, 'Pamela', 'Anderson', 'pamela@gmail.com', '06d700ebb7e452b52749bdf9b84813b24431aa0ebbf7f07761a4b1bd1b2c2e5c64122e9bef3aff69e1af7ab11af98a68e6b13ecce2cea44037364b525e3de954', 2),
(32, 'Leo', 'Messi', 'leo@gmail.com', '06d700ebb7e452b52749bdf9b84813b24431aa0ebbf7f07761a4b1bd1b2c2e5c64122e9bef3aff69e1af7ab11af98a68e6b13ecce2cea44037364b525e3de954', 2);

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
(5, 'Moscow, Russia', 'A city where the winters are colder than your ex\'s heart, and the summers are hotter than a Russian sauna. Come for the onion-domed churches, stay for the vodka and borscht. Make sure to practice your best \"nyet\" and bundle up!', '2023-07-31 00:00:00', '2023-08-20 00:00:00', '300.00', '5e17fce4-c3e1-4d26-876c-c80179a5e6ae.jpg'),
(6, 'St Petersburg, Russia', 'St. Petersburg - the city that\'s like a Russian nesting doll. It\'s beautiful on the outside, but you never know what you\'re going to get on the inside. One minute you\'re admiring the stunning architecture, and the next minute you\'re lost in a maze of confusing streets. It\'s a city where the weather is always cold, but the vodka is always warm. So grab your fur hat and your favorite bottle of Stoli, and get ready to explore the city where the streets have more twists and turns than a Russian nove', '2023-04-21 00:00:00', '2023-05-28 00:00:00', '299.00', 'ec8db242-715c-4662-b63a-efa89ed7a423.jpg'),
(7, 'Verona, Italy', 'Verona is a charming city located in the north of Italy, known for its romantic ambiance, beautiful architecture, and fascinating history. Famous for being the setting of Shakespeare\'s \'Romeo and Juliet,\' Verona has a wealth of attractions to explore, from ancient Roman ruins to medieval castles and churches. Visitors can stroll through the winding streets of the old town, admire the stunning Piazza Bra, or visit the iconic Verona Arena, an impressive Roman amphitheater. Verona is also renowned ', '2023-09-21 00:00:00', '2023-09-26 00:00:00', '200.00', 'bf5f7299-2746-4e76-8b9a-9d91142d6ab6.jpg'),
(8, 'Istanbul, Turkey', 'Istanbul is a vibrant and cosmopolitan city in Turkey that straddles Europe and Asia, making it a unique blend of cultures and traditions. With its rich history and architecture, Istanbul offers a wealth of attractions, including the stunning Hagia Sophia, the opulent Topkapi Palace, and the iconic Blue Mosque. The city also boasts bustling bazaars and markets, such as the Grand Bazaar and Spice Market, where visitors can shop for traditional Turkish goods and sample local cuisine. The Bosphorus', '2023-09-20 00:00:00', '2023-09-25 00:00:00', '233.00', '817deee3-1598-4976-9b6a-3574cc73328e.jpg'),
(9, 'San Francisco, USA', 'San Francisco is a vibrant city in Northern California known for its stunning scenery, diverse neighborhoods, iconic landmarks like the Golden Gate Bridge and Alcatraz Island, and rich cultural offerings including food, art, and music.', '2023-04-18 00:00:00', '2023-05-18 00:00:00', '350.00', '85fc8081-8688-41a1-9c5c-2828d5d7256d.jpg'),
(10, 'Tokyo, Japan', 'Tokyo is a bustling city in Japan that seamlessly blends the traditional and the modern. Visitors can explore ancient temples and shrines, experience traditional Japanese culture, and indulge in delicious cuisine, while also enjoying cutting-edge technology and entertainment. Tokyo is known for its unique fashion, anime and manga culture, and vibrant nightlife. With its fast-paced energy and endless attractions, Tokyo is a must-visit destination for anyone looking for a truly immersive and unfor', '2023-04-28 00:00:00', '2023-05-09 00:00:00', '400.00', '5f7b7469-4a94-4ac8-8f1c-a7deb7d07500.jpg'),
(11, 'London, United Kingdom', 'Experience the vibrant energy of London, one of the world\"s most exciting cities. From the iconic Big Ben and the Tower of London to the trendy Shoreditch and the bustling Oxford Street, London offers endless attractions to explore. Immerse yourself in the rich history and culture of this magnificent city, enjoy a traditional afternoon tea, and soak up the lively atmosphere of London\"s pubs and bars. Whatever your interests, London is a city that will capture your heart and leave you wanting mor', '2023-08-01 00:00:00', '2023-08-10 00:00:00', '180.00', '4ea9ea3f-bd77-4b13-adfe-456b809a90e5.jpg'),
(12, 'Dushanbe, Tajikistan', 'Discover the beauty and intrigue of Dushanbe, the capital city of Tajikistan. Nestled in the heart of Central Asia, Dushanbe offers a unique blend of culture, history, and natural beauty. Explore the stunning architecture of the city, from the grandeur of the National Museum of Tajikistan to the intricate mosaics of the Haji Yakoub Mosque. Take a stroll through the vibrant bazaars, where you can shop for local handicrafts and spices. And don\"t miss the chance to explore the rugged mountains and ', '2023-06-01 00:00:00', '2023-06-10 00:00:00', '100.00', '0de4be1a-a6a8-4d41-94cf-94fb0d73e460.jpg');

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
