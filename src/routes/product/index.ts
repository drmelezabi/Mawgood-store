import { Router } from 'express';
import * as controller from '../../controller/product';
import validateToken from '../../middleware/auth';

const ProductRoutes = Router();

ProductRoutes.route('/')
  .post(validateToken, controller.createProduct)
  .get(controller.getProductList);
ProductRoutes.route('/:id')
  .get(controller.getProduct)
  .patch(validateToken, controller.updateProduct)
  .delete(validateToken, controller.deleteProduct);
ProductRoutes.route('/cat/:category').get(controller.getProdByCat);

export default ProductRoutes;