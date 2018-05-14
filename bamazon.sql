DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Summer Infant Clear Sight Digital Color Video Baby Monitor", "security_surveillance", 89.45, 20), ("Legrand-On-Q Wireless Intercom Room Unit", "security_surveillance", 190.45, 10), ("Night Owl Lite B-10LHDA-1681-720 Video Surveillance System", "security_surveillance", 527.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Aluratek ADS02F 2-Port DVI Video Splitter", "cables_and_wire", 89.00, 20), ("C2G 12ft Velocity Mini-Coax F-Type Cable", "cables_and_wire", 9.45, 10), ("AddOn 10ft HDMI Male to Male Black Cable", "cables_and_wire", 7.45, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Antec P100 Performance One Series", "computer_hardware", 76.95, 20), ("Creative Inspire T3300 2.1 Speaker System - 25 W RMS", "computer_hardware", 51.95, 10), ("HP EliteBook 840 G3 14"" Notebook - Intel Core i5 (6th Gen)", "computer_hardware", 1196.45, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sangean RCR-24 Clock Radio - 1 W RMS", "electronics", 69.45, 20), ("Panasonic DMP-BDT270 1 Disc(s) 3D Bluray Disc Player", "electronics", 115.95, 10), ("Livescribe Echo 3-D Recording Headset", "electronics", 20.95, 5);