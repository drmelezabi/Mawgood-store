CREATE TYPE enum AS ENUM ('active', 'complete') ;

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    user_id INTEGER,
    status enum NOT NULL
);