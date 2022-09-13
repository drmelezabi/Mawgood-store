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

### 4. Express Handlers

created three models {users, product ,order}
cors are use in the app

### 5. JWTs

create a JWT as a result for the success login or password reset

## backend have the following RESTful APIs

**users**

_Create users --> /api/users/_
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

_Get user by ID --> /api/:users/_ --Need Bearer Token
Get user_id as a param
and return
Return
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

_Get users --> /api/:users/_ --Need Bearer Token
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

_Update user --> /api/:users/_ --Need Bearer Token
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

_Delete user by ID --> /api/:users/_ --Need Bearer Token
get user_id as a param
and return
Return deleted user data
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

_auth users login Endpoint --> /api/users/auth_
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

_reset user password Endpoint --> /api/users/resetpassword_
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

_Get best 5 sellers_ --Need Bearer Token
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
_Create Product --> /api/products_ --Need Bearer Token
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

_Get Product --> /api/products/:id_
Get product id as a param is & Return
{
"id" : <number>
"name": <string>
"price": <string>
"category": <string>
}

_Get Product --> /api/products/cat/:category_
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

_Update Product --> /api/products/:id_ --Need Bearer Token
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

_Delete Product by ID --> /api/Products/:id_ --Need Bearer Token
Delete user_id as a param
and return
Return deleted user data
{
"email" : <string>
"user_name": <string>
"first_name": <string>
"last_name": <string>
}

_Get best 5 sellers Product --> /api/products/cat/:category_ --Need Bearer Token
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
_Create an order --> /api/orders_ --Need Bearer Token
Get a Json body
{
"product_id": <number>
"quantity": <number>
"user_id: <number>
}
Return
{
"order_id": <number>
"created_at": <string>
"quantity": <number>
"product_name": <string>
"invoice": <number>
"user_name": <string>
"email": <string>
"product_id": <number>
"status": <string>
}

_Get orders by user id --> /api/orders/users/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"order_id": <number>
"created_at": <string>
"quantity": <number>
"product_name": <string>
"invoice": <number>
"user_name": <string>
"email": <string>
"product_id": <number>
"status": <string>
}

_Get current orders by user id --> /api/orders/current/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"order_id": <number>
"created_at": <string>
"quantity": <number>
"product_name": <string>
"invoice": <number>
"user_name": <string>
"email": <string>
"product_id": <number>
"status": <string>
}

_Get on progress order by user id --> /api/orders/onprogress/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"order_id": <number>
"created_at": <string>
"quantity": <number>
"product_name": <string>
"invoice": <number>
"user_name": <string>
"email": <string>
"product_id": <number>
"status": <string>
}

_Get on completed order by user id --> /api/orders/done/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"order_id": <number>
"created_at": <string>
"quantity": <number>
"product_name": <string>
"invoice": <number>
"user_name": <string>
"email": <string>
"product_id": <number>
"status": <string>
}

_Update order status by user id --> /api/orders/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"status": <string>
}

_delete order status by user id --> /api/orders/:userId_ --Need Bearer Token
Get user id as a param & Return
{
"order_id": <number>
"created_at": <string>
"quantity": <number>
"product_name": <string>
"invoice": <number>
"user_name": <string>
"email": <string>
"product_id": <number>
"status": <string>
}
