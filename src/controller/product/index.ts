import { Response, Request, NextFunction } from 'express';
import Products from '../../model/product';
import { Product } from '../../types/product';
import { parse } from '../../middleware/parsing';

const product: Products = new Products();

// Get all products "/"
export const getProductList = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts: Product[] = await product.getProducts();
    return res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

// Get product by id '/:id'
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId: number = parseInt(req.params.id);
    const productById: Product = await product.getProductById(productId);
    return res.json(productById);
  } catch (error) {
    next(error);
  }
};

// Get products by category '/cat/:category'
export const getProdByCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category: string = req.params.category as string;
    const productByCat: Product[] = await product.getProductByCat(category);
    return res.json(productByCat);
  } catch (error) {
    next(error);
  }
};

// Create product '/' validateToken
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if ('name' in req.body && 'price' in req.body && 'category' in req.body) {
      const createdProduct: Product = await product.createProduct(req.body);
      return res.json(createdProduct);
    } else {
      res.status(400).json({
        status: 'error',
        message: 'some needed data is missed',
      });
      return;
    }
  } catch (error) {
    next(parse(error as NodeJS.ErrnoException));
  }
};

// Update product by id '/:id' validateToken
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'some needed data is missed',
      });
      return;
    } else {
      const str: Array<string> = [];
      for (const [p, val] of Object.entries(req.body)) {
        str.push(`${p} = '${val}' `);
      }
      const result = await product.updateProducts(
        parseInt(req.params.id),
        str.toString()
      );
      res.json({ ...result });
    }
  } catch (error) {
    next(error);
  }
};

// Delete product by id '/:id' validateToken
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedOrder = await product.deleteProduct(id);
    return res.json(deletedOrder);
  } catch (error) {
    next(error);
  }
};

// Get best sellers 5
export const get5BestSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await product.get5BestSellers();
    res.json({
      data: [...result],
    });
  } catch (error) {
    next(error);
  }
};
