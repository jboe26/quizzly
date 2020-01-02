CREATE DATABASE quizzly_db;
USE quizzly_db;

CREATE TABLE user
(
    id int NOT NULL AUTO_INCREMENT,
	Last_name varchar (255) NOT NULL,
    First_name varchar (255) NOT NULL,
    user_email varchar (255) NOT NULL,
    user_password varchar (255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE quiz
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    category int NOT NULL,
    Primary Key (id),
    FOREIGN KEY (user_id)
    REFERENCES user(id)
);

CREATE TABLE score
(
    id int NOT NULL AUTO_INCREMENT,
    quiz_id int NOT NULL,
    score decimal,
    Primary Key (id),
    FOREIGN KEY (quiz_id)
    REFERENCES quiz(id)
);