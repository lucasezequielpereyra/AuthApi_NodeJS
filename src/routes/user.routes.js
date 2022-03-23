import { Router } from 'express';
const router = Router();

import * as userCtrl from '../controllers/users.controller';
import { authJwt, verifiySignUp } from '../middlewares/index';

router.post(
  '/create',
  [authJwt.verifyToken, authJwt.isAdmin, verifiySignUp.verifyRolesExist],
  userCtrl.createUser,
);

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.getUsers);

router.get(
  '/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.getUsersById,
);

router.put(
  '/updateUsersAdmin/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.updateUser,
);

export default router;
