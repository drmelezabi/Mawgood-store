CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--Create tanle users
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
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
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    user_id INTEGER,
    status VARCHAR(10) NOT NULL
    );

-- Create order_products table
CREATE TABLE order_products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity integer,
    order_id uuid REFERENCES orders(id),
    product_id uuid REFERENCES products(id)
);