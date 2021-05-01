CREATE TABLE `pizza`.`menus` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) NOT NULL , `image` VARCHAR(255) NOT NULL , `price` INT NOT NULL , `size` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
INSERT INTO `menus` (`id`, `name`, `image`, `price`, `size`) VALUES (NULL, 'panner pizza', 'pizza.png', '200', 'small'), (NULL, 'vegies pizza', 'piz1.jpg', '500', 'medium')
