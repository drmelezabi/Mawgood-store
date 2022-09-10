CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--Create tanle users
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create products table
CREATE TABLE products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price NUMERIC NOT NULL,
    category VARCHAR(50)
);

-- Create orders table
CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(10) NOT NULL,
    quantity INTEGER DEFAULT 1,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
    );

-- Create some users
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('mohamedElEzabi@test.com','melezabi','mohamed','elezabi','m123');
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('samyFayec@test.com','sfayek','samy','Fayek','sa123');
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('sozy@test.com','selezabi','suzan','elezabi','su123');
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('norhan@test.com','nelezabi','norhan','elezabi','no123');
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('naser@test.com','nelezabi','nasser','elezabi','na123');
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('azza@test.com','aelgammal','azza','elgammal','a123');

-- Create some products
INSERT INTO products(name,price,category) VALUES ('BMW',300000,'cars');
INSERT INTO products(name,price,category) VALUES ('Chevrolie',250000,'cars');
INSERT INTO products(name,price,category) VALUES ('Fiat',150000,'cars');
INSERT INTO products(name,price,category) VALUES ('TV',8000,'Electronics');
INSERT INTO products(name,price,category) VALUES ('Harry Potter',50,'Books');
INSERT INTO products(name,price,category) VALUES ('HP Laptop',15000,'Computers');
INSERT INTO products(name,price,category) VALUES ('Cat',500,'pets');
INSERT INTO products(name,price,category) VALUES ('Fan',800,'Electronics');