import { Router } from 'express';
import * as controller from '../../controller/users';
import validateToken from '../../middleware/auth';

const userRoutes = Router();

userRoutes
  .route('/')
  .post(controller.createUser)
  .get(validateToken, controller.getUsrList);
userRoutes
  .route('/:id')
  .get(validateToken, controller.getUser)
  .patch(validateToken, controller.updateUser)
  .delete(validateToken, controller.deleteUser);
userRoutes.route('/auth').post(controller.authentication);

export default userRoutes;
