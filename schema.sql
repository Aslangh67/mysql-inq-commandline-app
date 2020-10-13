DROP DATABASE IF EXISTS theoffice_db;
CREATE DATABASE theoffice_db;

USE theoffice_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE crew(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    cool BOOLEAN NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL
    FOREIGN KEY (department_id) REFERENCES department (id)
    PRIMARY KEY (id)
);