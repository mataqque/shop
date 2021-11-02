CREATE DATABASE shop;

USE shop;

CREATE TABLE users(
    id_user INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    perfil VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id_user INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE users ADD email VARCHAR(16) NOT NULL;
ALTER TABLE users ADD phone VARCHAR(16) NOT NULL;


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
    title VARCHAR(255) NOT NULL
);

ALTER TABLE slider
  ADD PRIMARY KEY (id);