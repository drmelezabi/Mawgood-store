import pool from '../../database';
import { Product } from '../../types/product';
import * as externalSQL from './sqlData';
import Products from '../../model/product';

const product: Products = new Products();

describe('--------------------------- Products Model ---------------------------', () => {
  describe('Products basic CRUD', () => {
    const newProduct = {
      name: 'iphone 14',
      price: '1200',
      category: 'Mobile Phones',
    } as Product;

    beforeAll(async () => {
      const createProduct = await product.createProduct(newProduct);
      newProduct.id = createProduct.id;
    });

    describe('Get products', () => {
      it('Get list of Product data return list of products data objects', async () => {
        const result = await product.getProducts();
        expect(result.length).toEqual(1);
      });

      it('Get product by ID return the product data object if user id in exist', async () => {
        const result = await product.getProductById(1);
        expect(result.name).toEqual('iphone 14');
      });

      it('Get product by ID retune undefined when Product id is not exist', async () => {
        const result = await product.getProductById(15);
        expect(result as Product | undefined).toBe(undefined);
      });

      it('Get product by category return list of product data objects if user id in exist', async () => {
        const result = await product.getProductByCat('Mobile Phones');
        expect(result.length).toEqual(1);
      });

      it('Get product by category return Empty list category dose not have any products', async () => {
        const result = await product.getProductByCat('Sport');
        expect(result.length).toBe(0);
      });
    });

    describe('Update products', () => {
      it('Update product by ID return the product edited data objects if user id in exist', async () => {
        const result = await product.updateProducts(1, `price = '1300' `);
        expect(result.price).toEqual('1300');
      });

      it('Update product by ID retune undefined when Product id is not exist', async () => {
        const result = await product.updateProducts(25, `price = '1300' `);
        expect(result as Product | undefined).toBe(undefined);
      });
    });

    describe('Delete products', () => {
      it('Delete product by ID return the deleted product data objects if user id in exist', async () => {
        const result = await product.deleteProduct(1);
        expect(result.price).toEqual('1300');
      });

      it('Delete product by ID retune undefined when Product id is not exist', async () => {
        const result = await product.deleteProduct(30);
        expect(result as Product | undefined).toBe(undefined);
      });
    });

    describe('Create products', () => {
      it('Create New product return the product data object', async () => {
        const result = await product.createProduct(newProduct);
        expect(result.price).toEqual('1200');
      });
    });

    afterAll(async () => {
      const sql =
        'DELETE FROM products; \n ALTER SEQUENCE users_id_seq RESTART;';
      const client = await pool.connect();
      await client.query(sql);
      client.release();
    });
  });

  describe('Get Best Users', () => {
    beforeAll(async () => {
      const sql = `DELETE FROM users;
        ALTER SEQUENCE users_id_seq RESTART;
        DELETE FROM products;
        ALTER SEQUENCE products_id_seq RESTART;
        DELETE FROM orders;
        ALTER SEQUENCE orders_id_seq RESTART;`;
      let client = await pool.connect();
      await client.query(sql);
      client.release();
      client = await pool.connect();
      await client.query(externalSQL.sql);
      client.release();
    });

    it('Get Best 5 sellers', async () => {
      const result = await product.get5BestSellers();
      expect(result.length).toEqual(5);
    });

    afterAll(async () => {
      const sql = `DELETE FROM order_products; 
      ALTER SEQUENCE order_products_id_seq RESTART;
      DELETE FROM orders; 
      ALTER SEQUENCE orders_id_seq RESTART;
      DELETE FROM products; 
      ALTER SEQUENCE products_id_seq RESTART;
      DELETE FROM users; 
      ALTER SEQUENCE users_id_seq RESTART; 
      `;
      const client = await pool.connect();
      await client.query(sql);
      client.release();
    });
  });
});
