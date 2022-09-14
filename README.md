# Storefront Backend Project

## Required Technologies

The application use of the following libraries:
✔ Postgres for the database
✔ Node/Express for the application logic
✔ dotenv from npm for managing environment variables
✔ db-migrate from npm for migrations
✔ jsonwebtoken from npm for working with JWTs
✔ jasmine from npm for testing **over 80 unit testing cases**

## Steps to Completion

_preparation_
need to install node_modules -> npm run install
.env variables ar

*SERVER_PORT= ----
*NODE_ENV=dev ----
*PG_HOST=localhost
*PG_PORT=5432
*PG_DB=store_dev
*PG_DB_TEST=store_test
*PG_USER=----
*PG_PASSWORD=-----
*BCRYPT_PASSWORD= ------
*SLART_ROUNDS=10

TOKEN_SECRET= ------

_DB Creation and Migrations_
connect PostgreSQL local
need Postgres installed on PC
npm run migrate:up
npm run migrate:down
need to create _Two Databases_ : **store_dev & store_test** or create your own in .env ;)
migration is working using **npm run migrate:up** & **npm run migrate:down**

run prettier **npm run format**
run eslint & eslint with fixing **npm run lint** & **npm run lint:fix**

for run in developer mode with nodemon use **npm run dev**
for run in compiled mode use **npm start**

_middlewares_
-config middleware to handle .env variables
-auth middleware to validate bearer token and handle unauthorized requests
-error middleware to handle errors and secure some errors information
-parse middleware to handle some database errors messages to be simple and secure
-security middleware to export bcrypt & JWT used functions

_controllers_
controllers for every endpoint tp filter it before send it to modules and return json of result or errors

_Unit Testing_
-over 80 unit testing case covered in the testing in handling error and success request
-every models functions & Endpoint fully covered in testing
-testing is working using **npm run test** or **npm run test:mac**

### Express Handlers

created three models {users, product ,order}
cors are use in the app

### JWTs

create a JWT as a result for the success login or password reset

## tables schema

**Users <Public>**

id : <integer> : not null - <nextval('users_id_seq'::regclass)>
email : <character varying(50)>
user_name : <character varying(50)> - not null
first_name : <character varying(50)> - not null
last_name : <character varying(50)> - not null
password : <character varying(50)> - not null

Indexes:
"users_pkey" PRIMARY KEY, btree (id)
"users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE

---

**products <Public>**

id : <integer> - not null - nextval('products_id_seq'::regclass)
name : <character varying(50)> - not null
price : <numeric> - not null
category : <character varying(50)>

Indexes:
"products_pkey" PRIMARY KEY, btree (id)
Referenced by:
TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

---

**orders <Public>**

id : <integer> -not null - <nextval('orders_id_seq'::regclass)>
created_at : <timestamp with time zone> - not null - CURRENT_TIMESTAMP
status : <mode> as ENUM of ("complete","active") - not null
user_id : <bigint>
"orders_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
Referenced by:
TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

---

**order_products <Public>**

id : <integer> - not null - <nextval('order_products_id_seq'::regclass)>
order_id : <bigint>
product_id : <bigint>
quantity : <integer> : Default 1
created_at : <timestamp with time zone> - not null - <CURRENT_TIMESTAMP>

Indexes:
"order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

## backend have the following RESTful APIs

**users**

_Create users --> **GET** /api/users/_
Get a Json body
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
"password": <string>
}
Return
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

_Get user by ID --> **GET** /api/:users/_ --Need Bearer Token
Get user_id as a param
and return
Return
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

_Get users --> **GET** /api/:users/_ --Need Bearer Token
Get nothing and return
Return list of users
[
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
},
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}
]

_Update user --> **PATCH** /api/:users/_ --Need Bearer Token
Get user\*id as a param
and a Json body with some or all of this keys _! Password is not allowed_
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

and return
Return
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

_Delete user by ID --> **DELETE** /api/:users/_ --Need Bearer Token
get user_id as a param
and return
Return deleted user data
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

_auth users login Endpoint --> **POST** /api/users/auth_
Get a Json body
{
"email" : <string>
"password": <string>
}
Return
{
status : <string>
userData : {
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
"token": <bearer_token_string>
}
}

_reset user password Endpoint --> **GET** /api/users/resetpassword_
Get a Json body
{
"email" : <string>
"password": <string>
"newPassword": <string>
}
Return
{
status : <string>
userData : {
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
"token": <bearer_token_string>
}
}

_Get best 5 sellers **GET** /api/users/bestsellers_ --Need Bearer Token
Get nothing and return
Return list of users
[
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
},
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}
]

---

**products**
/api/products
_Create Product --> **POST** /api/products_ --Need Bearer Token
Get a Json body
{
"name": <string>
"price": <string>
"category": <string>
}
Return
{
"id" : <number>
"name": <string>
"price": <string>
"category": <string>
}

_Get Product --> **GET** /api/products/:id_
Get product id as a param is & Return
{
"id" : <number>
"name": <string>
"price": <string>
"category": <string>
}

_Get Product --> **GET** /api/products/cat/:category_
Get products category as a param & Return
[
{
"id" : <number>
"name": <string>
"price": <string>
"category": <string>
},
{
"id" : <number>
"name": <string>
"price": <string>
"category": <string>
}
]

_Update Product --> **PATCH** /api/products/:id_ --Need Bearer Token
Get product id as a param
and a Json body with some or all of this keys
{
"name": <string>
"price": <string>
"category": <string>
}
Return
{
"id" : <number>
"name": <string>
"price": <string>
"category": <string>
}

_Delete Product by ID --> **DELETE** /api/Products/:id_ --Need Bearer Token
Delete user_id as a param
and return
Return deleted user data
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

_Get best 5 sellers Product --> **GET** /api/products/cat/:category_ --Need Bearer Token
Get notheing & Return
[
{
"id" : <number>
"name": <string>
"price": <string>
"category": <string>
},
{
"id" : <number>
"name": <string>
"price": <string>
"category": <string>
}
]

**orders**
/api/orders
_Create an order --> **POST** /api/orders_ --Need Bearer Token
Get a Json body
{
"product_id": <number>
"quantity": <number>
"user_id: <number>
}
Return
{
"order_id": <number>,
{
"item_id": <number>,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
}
}

_Get orders by user id --> **GET** /api/orders/users/:userId_ --Need Bearer Token
Get user id as a param & Return
[
{
"order_id": <number>,
"items": [
{
"item_id": <number>,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
},
"item_id": number,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
}
]
},
]

_Get current orders by user id --> **GET** /api/orders/current/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"order_id": <number>,
"items": [
{
"item_id": <number>,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
},
"item_id": number,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
}
]
}

_Get on progress order by user id --> **GET** /api/orders/onprogress/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"order_id": <number>,
"items": [
{
"item_id": <number>,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
},
"item_id": number,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
}
]
}

_Get on completed order by user id --> **GET** /api/orders/done/:userId_ --Need Bearer Token
Get user id as a param & Return
{
<number>: {
"order_id": <number>,
"items": [
{
"item_id": <number>,
"created_at": <string> => timestamp,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>,
"status": <string>
},
{
"item_id": <number>,
"created_at": <string> => timestamp,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>,
"status": <string>
}
]
},
}

_Update order status by user id --> **PATCH** /api/orders/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"message": "order number <number> successfully updated",
"data": {
"order_id": <number>,
"status": <string>,
"items": [
{
"item_id": <number>,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
},
"item_id": number,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
}
]
}
}

_delete order status by user id --> **DELETE** /api/orders/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"message": "order number <number> successfully deleted",
"data": {
"order_id": <number>,
"status": <string>,
"items": [
{
"item_id": <number>,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
},
"item_id": number,
"created_at": <string> -> timestamo,
"quantity": <number>,
"product_name": <string>,
"invoice": <string>,
"product_id": <number>
}
]
}
}
