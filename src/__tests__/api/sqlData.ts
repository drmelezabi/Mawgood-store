export const sql = `-- Create some users
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('mohamedElEzabi@test.com','melezabi','mohamed','elezabi','$2b$10$7.l7XLetGNblTSBtTmk07OWuwTuUvi/XyECOMDC4enyKgfH6hZJka'); --1 mohamed m123
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('samyFayec@test.com','sfayek','samy','Fayek','$2b$10$CPMTnqCgkoVJ5PvAeyp9Zuo3wEonOaubmLT.8xfjsSdWTerqCVvlS'); --2 samy sa123
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('sozy@test.com','selezabi','suzan','elezabi','$2b$10$MSFr5PnV1Bz7vykcsCPOcO9evOy5Xd54sBzm.5gIINEB7nTBCfEYi'); --3 suzan su123
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('norhan@test.com','nelezabi','norhan','elezabi','$2b$10$wCf/6XoSPIVu5RtVD36NauNk6nCSKk.0fbm1ryZrOnAkyr4QyqoNW'); --4 norhan no123
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('naser@test.com','nelezabi','nasser','elezabi','$2b$10$ApBkl4LG08xadPDmRcjmwOCgUSeBqTyHUnX/LnSoD9Ptf5Yj78H/K'); --5 nasser na123
INSERT INTO users(email,user_name,first_name,last_name,password) VALUES ('azza@test.com','aelgammal','azza','elgammal','$2b$10$KM04C/6/ADt.mIHEk0k.2.BQnn9RQaDOReRkmU/R5vsfSQAZyUDmG'); --6 azza a123

-- -- Create some products
INSERT INTO products(name,price,category) VALUES ('BMW',300000,'cars'); --1
INSERT INTO products(name,price,category) VALUES ('Chevrolie',250000,'cars'); --2
INSERT INTO products(name,price,category) VALUES ('Fiat',150000,'cars'); --3
INSERT INTO products(name,price,category) VALUES ('TV',8000,'Electronics'); --4
INSERT INTO products(name,price,category) VALUES ('Harry Potter',50,'Books'); --5
INSERT INTO products(name,price,category) VALUES ('HP Laptop',15000,'Computers'); --6
INSERT INTO products(name,price,category) VALUES ('Cat',500,'pets'); --7
INSERT INTO products(name,price,category) VALUES ('Fan',800,'Electronics'); --8
INSERT INTO products(name,price,category) VALUES ('Car Mirror',35,'cars'); --9
INSERT INTO products(name,price,category) VALUES ('chair cover',20,'cars'); --10
INSERT INTO products(name,price,category) VALUES ('samsung Galaxy Note 10',1200,'Electronics'); --11
INSERT INTO products(name,price,category) VALUES ('iphone cover',1200,'Electronics'); --12
INSERT INTO products(name,price,category) VALUES ('Keyboard',2000,'Music Instrments'); --13
INSERT INTO products(name,price,category) VALUES ('violin',1500,'Music Instrments'); --14
INSERT INTO products(name,price,category) VALUES ('DVD Pack',15,'Computers'); -- 15
INSERT INTO products(name,price,category) VALUES ('AOC Gaming monitor',400,'Computers'); --16
INSERT INTO products(name,price,category) VALUES ('Kindle Paper white gen 7 8gb',150,'E-Books'); --17
INSERT INTO products(name,price,category) VALUES ('Glasses',150,'heath'); --17




INSERT INTO orders (user_id, status) VALUES(1,'complete'); --1
INSERT INTO orders (user_id, status) VALUES(2,'complete'); --2
INSERT INTO orders (user_id, status) VALUES(4,'complete'); --3
INSERT INTO orders (user_id, status) VALUES(6,'complete'); --4
INSERT INTO orders (user_id, status) VALUES(1,'complete'); --5
INSERT INTO orders (user_id, status) VALUES(6,'complete'); --6
INSERT INTO orders (user_id, status) VALUES(5,'complete'); --7
INSERT INTO orders (user_id, status) VALUES(1,'complete'); --8
INSERT INTO orders (user_id, status) VALUES(6,'complete'); --9
INSERT INTO orders (user_id, status) VALUES(2,'active');   --10
INSERT INTO orders (user_id, status) VALUES(3,'active');   --11
INSERT INTO orders (user_id, status) VALUES(6,'complete'); --12
INSERT INTO orders (user_id, status) VALUES(4,'complete'); --13
INSERT INTO orders (user_id, status) VALUES(6,'complete'); --14
INSERT INTO orders (user_id, status) VALUES(6,'active');   --15
INSERT INTO orders (user_id, status) VALUES(1,'active');   --16



INSERT INTO order_products (order_id,product_id,quantity) VALUES(1,1,1);  --1
INSERT INTO order_products (order_id,product_id,quantity) VALUES(1,10,2); --2
INSERT INTO order_products (order_id,product_id,quantity) VALUES(2,4,1);  --3
INSERT INTO order_products (order_id,product_id,quantity) VALUES(2,3,2);  --4
INSERT INTO order_products (order_id,product_id,quantity) VALUES(3,9,1);  --5
INSERT INTO order_products (order_id,product_id,quantity) VALUES(3,10,1); --6
INSERT INTO order_products (order_id,product_id,quantity) VALUES(3,10,1); --7
INSERT INTO order_products (order_id,product_id,quantity) VALUES(4,8,4);  --8
INSERT INTO order_products (order_id,product_id,quantity) VALUES(4,8,2);  --9
INSERT INTO order_products (order_id,product_id,quantity) VALUES(5,11,1); --7
INSERT INTO order_products (order_id,product_id,quantity) VALUES(6,6,1);  --8
INSERT INTO order_products (order_id,product_id,quantity) VALUES(7,17,1); --9
INSERT INTO order_products (order_id,product_id,quantity) VALUES(7,6,1);  --10
INSERT INTO order_products (order_id,product_id,quantity) VALUES(8,16,1); --11
INSERT INTO order_products (order_id,product_id,quantity) VALUES(9,8,2);  --12
INSERT INTO order_products (order_id,product_id,quantity) VALUES(10,7,2); --13
INSERT INTO order_products (order_id,product_id,quantity) VALUES(11,6,1); --14
INSERT INTO order_products (order_id,product_id,quantity) VALUES(12,4,2); --15
INSERT INTO order_products (order_id,product_id,quantity) VALUES(13,6,1); --16
INSERT INTO order_products (order_id,product_id,quantity) VALUES(14,11,2);--17
INSERT INTO order_products (order_id,product_id,quantity) VALUES(15,17,2);--18
INSERT INTO order_products (order_id,product_id,quantity) VALUES(16,6,2);--19
INSERT INTO order_products (order_id,product_id,quantity) VALUES(16,5,6);--20`;
