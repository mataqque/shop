CREATE DATABASE project;

USE project;

CREATE TABLE users(
    id_user INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(300) NOT NULL,
    perfil VARCHAR(150) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(16) NOT NULL
);

CREATE TABLE files(
    id_file INT AUTO_INCREMENT,
    filename VARCHAR(200) NOT NULL,
    coding  VARCHAR(20) NOT NULL,
    mimetype VARCHAR(20) NOT NULL,
    destination VARCHAR(200) NOT NULL,
    size INT(20) NOT NULL,
    path VARCHAR(200) NOT NULL,
    PRIMARY KEY (id_file)
);

CREATE TABLE slider (
    id INT(11) NOT NULL,
    imageDesk VARCHAR(255) NOT NULL,
    imageMobile VARCHAR(255) NOT NULL,
    alt VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL
);