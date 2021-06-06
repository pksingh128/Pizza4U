-- CREATE TABLE `pizza`.`menus` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) NOT NULL , `image` VARCHAR(255) NOT NULL , `price` INT NOT NULL , `size` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

-- INSERT INTO `menus` (`id`, `name`, `image`, `price`, `size`) VALUES (NULL, 'panner pizza', 'pizza.png', '200', 'small'), (NULL, 'vegies pizza', 'piz1.jpg', '500', 'medium')

-- CREATE TABLE `pizza`.`users` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(200) NOT NULL , `email` VARCHAR(200) NOT NULL , `password` VARCHAR(300) NOT NULL , `role` VARCHAR(100) NOT NULL DEFAULT 'customer' , `created_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP NOT NULL  , PRIMARY KEY (`id`)) ENGINE = InnoDB;

-- ALTER TABLE `users` ADD UNIQUE(`email`);

-- CREATE TABLE `pizza`.`orders` ( `o-Id` INT(11) NOT NULL AUTO_INCREMENT , `items` VARCHAR(200) NOT NULL , `phone` VARCHAR(100) NOT NULL , `address` TEXT NOT NULL , `paymentType` VARCHAR(100) NOT NULL DEFAULT 'COD' , `status` VARCHAR(100) NOT NULL DEFAULT 'order_placed' , `created_at` varchar(100)  , PRIMARY KEY (`o-Id`)) ENGINE = InnoDB;

-- ALTER TABLE `orders` ADD FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES (NULL, 'admin', 'admin@gmail.com', '$2b$08$5UMB8cCyRhPkUE7kh1SlJ.ZUewixEbJIeQLjNevzlFG2id2Prxnja', 'admin', CURRENT_TIMESTAMP);
-- CREATE TABLE `pizza`.`contacts` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(200) NOT NULL , `email` VARCHAR(100) NOT NULL , `phone` VARCHAR(100) NOT NULL , `message` VARCHAR(1000) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

-- database exported from xampp

-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2021 at 06:41 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizza`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `created_at` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `message`, `created_at`) VALUES
(1, 'Mayur', 'kolimayur128@gmail.com', '7065869945', 'hii', 'Sat,Jun 05 2021 02:54 PM'),
(2, 'Mayur', 'richakumari596@gmail.com', '7065869945', 'hii', 'Sat,Jun 05 2021 02:56 PM'),
(3, 'Prashant', 'pksingh76586@gmail.com', '7065869947', 'hii', 'Sat,Jun 05 2021 09:26 PM');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `size` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `image`, `price`, `size`) VALUES
(1, 'panner pizza', 'pizza.png', 200, 'small'),
(2, 'vegies pizza', 'piz1.jpg', 500, 'medium'),
(3, 'Peppy Panner', 'pizza.png', 500, 'large'),
(5, 'Fresh veggie', 'piz1.jpg', 300, 'Medium');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `items` varchar(200) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `paymentType` varchar(100) NOT NULL DEFAULT 'COD',
  `status` varchar(100) NOT NULL DEFAULT 'order_placed',
  `placed_at` varchar(100) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `paymentStatus` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `items`, `phone`, `address`, `paymentType`, `status`, `placed_at`, `customer_id`, `paymentStatus`) VALUES
(3, '{\"2\":{\"item\":{\"id\":2,\"name\":\"vegies pizza\",\"image\":\"piz1.jpg\",\"price\":500,\"size\":\"medium\"},\"qty\":1}}', '7065869945', 'bihar', 'card', 'completed', '08:02 PM', 2, 1),
(4, '{\"1\":{\"item\":{\"id\":1,\"name\":\"panner pizza\",\"image\":\"pizza.png\",\"price\":200,\"size\":\"small\"},\"qty\":1},\"2\":{\"item\":{\"id\":2,\"name\":\"vegies pizza\",\"image\":\"piz1.jpg\",\"price\":500,\"size\":\"medium\"},\"qty\":1}}', '7065869945', 'pune', 'COD', 'completed', '08:14 PM', 2, 0);

-- --------------------------------------------------------

-- Table structure for table `users`


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `phone`) VALUES
(2, 'Mayur', 'kolimayur128@gmail.com', '$2b$08$6iVxXyKHxridhAMxOme.rOiWPHfcHNGH/qN4ULx06Nf5YswGl9DJq', 'customer', '2021-06-05 21:17:08', '7065869945'),
(3, 'Prashant', 'pksingh76586@gmail.com', '$2b$08$r5e8qIIJS/JrLeKbqNT5TOsHp.b15d8NGqrZd.CYYqgNi1llgG9r2', 'customer', '2021-06-05 21:38:13', '7065869947'),
(4, 'admin', 'admin@gmail.com', '$2b$08$r5e8qIIJS/JrLeKbqNT5TOsHp.b15d8NGqrZd.CYYqgNi1llgG9r2', 'admin', '2021-06-05 21:42:41', '7065869947');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

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
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;





