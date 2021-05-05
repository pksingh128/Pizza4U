CREATE TABLE `pizza`.`menus` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) NOT NULL , `image` VARCHAR(255) NOT NULL , `price` INT NOT NULL , `size` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO `menus` (`id`, `name`, `image`, `price`, `size`) VALUES (NULL, 'panner pizza', 'pizza.png', '200', 'small'), (NULL, 'vegies pizza', 'piz1.jpg', '500', 'medium')

CREATE TABLE `pizza`.`users` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(200) NOT NULL , `email` VARCHAR(200) NOT NULL , `password` VARCHAR(300) NOT NULL , `role` VARCHAR(100) NOT NULL DEFAULT 'customer' , `created_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `users` ADD UNIQUE(`email`);
