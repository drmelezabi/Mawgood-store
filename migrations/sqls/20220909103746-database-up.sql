--Create tanle users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create products table
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price NUMERIC NOT NULL,
    category VARCHAR(50)
);

-- Create mode AS ENUM
CREATE TYPE mode AS ENUM ('active', 'complete');

-- Create orders table
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    created_at timestamp with time zone NOT NULL
    DEFAULT current_timestamp ,
    status mode NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );


-- Create order_products RE table
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    created_at timestamp with time zone NOT NULL
    DEFAULT current_timestamp
);