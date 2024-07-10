import { Request, Response } from 'express';
import userService from '../services/users.services';
import { verifyPassword } from '../config/bcrypt';
import { sign } from '../config/jwt';
import { HttpCodes } from '../utils';
import { RequestExtends } from '../interfaces/reqExtends.interface';
import { ADMIN, OPERARIO } from '../interfaces/rol.interface';

const getUsers = async (req: RequestExtends, res: Response) => {
  try {
    const currentUser = await userService.getUserById(parseInt(req.user.id));
    if (typeof currentUser === 'string') {
      return res.status(HttpCodes.CODE_BAD_REQUEST).json(currentUser);
    }

    if (currentUser.rol_id !== ADMIN) {
      return res.status(HttpCodes.CODE_FORBIDDEN).json('No tiene permisos para realizar esta acción')
    }

    const users = await userService.getAllUsers();
    const publicUsers = users.map(user => {
      const { contrasena, ...publicUser } = user.dataValues;
      return publicUser;
    });

    res.json(publicUsers.filter(user => String(user.id) !== req.user.id));
  } catch (error) {
    console.error(error);
    res.status(HttpCodes.CODE_INTERNAL_SERVER_ERROR).json('Error al obtener los usuarios')
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    if (typeof user === 'string') {
      return res.status(400).json('Usuario y/o contraseña incorrecta');
    }

    const isValid = await verifyPassword(req.body.contrasena, user.contrasena)
    if (!isValid) {
      return res.status(HttpCodes.CODE_BAD_REQUEST).json('Usuario y/o contraseña incorrecta');
    }

    const { contrasena, ...publicUser } = user.dataValues;
    const token = await sign({ id: String(publicUser.id) })
    res.json({ user: publicUser, token });

  } catch (error) {
    console.error(error);
    res.status(HttpCodes.CODE_INTERNAL_SERVER_ERROR).send('Error al realizar el login');
  }

}

const registerUser = async (req: RequestExtends, res: Response) => {
  try {
    const currentUser = await userService.getUserById(parseInt(req.user.id));
    if (typeof currentUser === 'string') {
      return res.status(HttpCodes.CODE_BAD_REQUEST).json(currentUser);
    }

    if (currentUser.rol_id !== ADMIN) {
      return res.status(HttpCodes.CODE_FORBIDDEN).json('No tiene permisos para realizar esta acción')
    }

    const { nombre, contrasena, email, rol_id = OPERARIO } = req.body;
    const user = await userService.insertUser({ nombre, contrasena, email, rol_id });
    res.status(HttpCodes.CODE_SUCCESS_CREATED).json(user);

  } catch (error) {
    console.error(error);
    res.status(HttpCodes.CODE_BAD_REQUEST).send('El email ya se encuentra en uso');
  }
};

const getUser = async (req: RequestExtends, res: Response) => {
  try {
    const user = await userService.getUserById(parseInt(req.user.id));
    if (typeof user === 'string') {
      return res.status(HttpCodes.CODE_BAD_REQUEST).json(user);
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(HttpCodes.CODE_INTERNAL_SERVER_ERROR).json('Error al obtener el usuario')
  }
};

const getUserById = async (req: RequestExtends, res: Response) => {
  const userId = req.user.id;
  const searchedUserId = String(req.params.id);

  if (userId === searchedUserId) {
    return getUser(req, res);
  }

  try {
    const user = await userService.getUserById(parseInt(userId));
    if (typeof user === 'string') {
      return res.status(HttpCodes.CODE_NOT_FOUND).json(user)
    }

    if (user.rol_id !== ADMIN) {
      return res.status(HttpCodes.CODE_FORBIDDEN).json('No tiene permisos para realizar esta acción')
    }

    const searchedUser = await userService.getUserById(parseInt(searchedUserId));
    if (typeof searchedUser === 'string') {
      return res.status(HttpCodes.CODE_NOT_FOUND).json('El usuario buscado no existe');
    }

    const { contrasena, ...publicSearchedUser } = searchedUser.dataValues;
    return res.json(publicSearchedUser);

  } catch (error) {
    console.error(error);
    res.status(HttpCodes.CODE_INTERNAL_SERVER_ERROR).json('Error al obtener el usuario');
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { nombre, contrasena, confirmContrasena, email } = req.body;

    const user = await userService.updateUserById(parseInt(id), { nombre, contrasena, confirmContrasena, email });
    res.json(user);
  } catch (error) {
    console.error(error);
    if (typeof error === 'string') {
      return res.status(HttpCodes.CODE_BAD_REQUEST).json(error);
    }

    return res.status(HttpCodes.CODE_INTERNAL_SERVER_ERROR).json();
  }
};

const deleteUser = async (req: RequestExtends, res: Response) => {
  try {
    const { id } = req.user;
    
    const user = await userService.deleteUserById(parseInt(id));
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(HttpCodes.CODE_INTERNAL_SERVER_ERROR).json();
  }
};

export { userLogin, getUsers, registerUser, getUser, getUserById, updateUser, deleteUser };