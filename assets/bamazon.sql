DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
position INT NOT NULL AUTO_INCREMENT,
item_id INT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (position)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (666, "Doom", "Video Games", 60.00, 20), 
(546, "Okami", "Video Games", 60.00, 20),
(658, "Monster Hunter", "Video Games", 60.00, 20),
(345, "Hulk Hands", "Toys", 29.99, 10),
(987, "Chewbacca Mask", "Toys", 29.99, 1),
(696, "Anime Figurine", "Toys", 1000.99, 5),
(626, "Lilo & Stitch DVD", "Entertainment", 19.99, 100),
(809, "Star Wars DVD", "Entertainment", 19.99, 100),
(456, "Attack on Titan DVD", "Entertainment", 19.99, 100),
(679, "The Actual Tears of Christ", "Other", 3000000.99, 1)
;