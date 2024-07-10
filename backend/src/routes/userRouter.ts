import express from 'express';
import { validateJWT } from '../middlewares/authentication';
import { userIdSchema, userLoginSchema, userSchema, userUpdateSchema } from '../validations/user';
import validationMiddleware from '../middlewares/validatorMiddeware';
import { getUsers, userLogin, registerUser, getUser, getUserById, updateUser, deleteUser } from '../controller/user.controllers';
import { jwtPayload } from '../config/jwt';

declare global {
  namespace Express {
    interface Request {
      user: jwtPayload;
    }
  }
}

const usersRouter = express.Router();

usersRouter.post('/login', validationMiddleware(userLoginSchema), userLogin)

usersRouter.use(validateJWT);

usersRouter.get('/', getUser);
usersRouter.put('/', validationMiddleware(userUpdateSchema), updateUser);
usersRouter.delete('/', deleteUser)

// admin
usersRouter.post('/', validationMiddleware(userSchema), registerUser);
usersRouter.get('/all', getUsers);
usersRouter.get('/:id', validationMiddleware(userIdSchema, true), getUserById);

export { usersRouter };
export default usersRouter;
