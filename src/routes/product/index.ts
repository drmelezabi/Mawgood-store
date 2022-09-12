import { Router } from 'express';
import * as controller from '../../controller/product';
import validateToken from '../../middleware/auth';

const ProductRoutes = Router();

ProductRoutes.route('/cat/:category').get(controller.getProdByCat);
ProductRoutes.route('/bestsellers').get(controller.get5BestSeller);
ProductRoutes.route('/:id')
  .get(controller.getProduct)
  .patch(validateToken, controller.updateProduct)
  .delete(validateToken, controller.deleteProduct);
ProductRoutes.route('/')
  .get(controller.getProductList)
  .post(validateToken, controller.createProduct);

export default ProductRoutes;
