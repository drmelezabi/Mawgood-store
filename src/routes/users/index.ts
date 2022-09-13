import { Router } from 'express';
import * as controller from '../../controller/users';
import validateToken from '../../middleware/auth';

const userRoutes = Router();

userRoutes.route('/bestusers').get(validateToken, controller.bestusers);
userRoutes.route('/resetpassword').patch(controller.resPasswords);
userRoutes.route('/auth').post(controller.authentication);
userRoutes
  .route('/:id')
  .get(validateToken, controller.getUser)
  .patch(validateToken, controller.updateUser)
  .delete(validateToken, controller.deleteUser);
userRoutes
  .route('/')
  .get(validateToken, controller.getUsrList)
  .post(controller.createUser);

export default userRoutes;
