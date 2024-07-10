import { hashPassword } from '../config/bcrypt';
import { CreateUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto';
import { ADMIN } from '../interfaces/rol.interface';
import { User, IUser } from '../models/user.model';

const getAllUsers = async (): Promise<IUser[]> => {
  /* const roles = await Rol.findAll();
  const rols = new Map<RolInterface['id'], RolInterface['descripcion']>();
  for (const rol of roles) {
    rols.set(rol.id, rol.descripcion);
  } */
  const users = await User.findAll();
  return users;
};

const insertUser = async (bodyUser: CreateUserDto): Promise<IUser> => {
  const { nombre, contrasena, email, rol_id } = bodyUser;
  const hashContrasena = await hashPassword(contrasena);

  const user = await User.create({
    nombre,
    contrasena: hashContrasena,
    email,
    rol_id
  });

  return user;
};

const getUserById = async (id: number): Promise<IUser | string> => {
  const user = await User.findOne({ where: { id: id } });
  if (!user) {
    return 'User id not found.';
  }
  return user;
};

const getUserByEmail = async (email: string): Promise<IUser | string> => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return 'User email not found.';
  }
  return user;
};

const updateUserById = async (id: number, bodyUser: updateUserDto): Promise<IUser | string> => {
  const { nombre, contrasena, confirmContrasena, email } = bodyUser;

  let user = await User.findOne({ where: { id: id } });
  if (!user) {
    return 'User id not found.';
  }

  let newHashContrasena: string | undefined;
  if (contrasena || confirmContrasena) {
    if ((contrasena && !confirmContrasena) || (!contrasena && confirmContrasena) || confirmContrasena !== contrasena) {
      return 'Escriba la misma contraseña ambas veces';
    }

    newHashContrasena = await hashPassword(<string>contrasena);
  }

  user = await user.update(
    {
      nombre,
      contrasena: newHashContrasena,
      email,
    },
    { where: { id: id } },
  );

  return user;
};

const deleteUserById = async (id: number): Promise<string> => {
  const findUser = await User.findOne({ where: { id: id } });
  if (!findUser) {
    return 'User not found.';
  }

  if (findUser.rol_id === ADMIN){
    return 'Could not delete user, you are admin';
  }

  const removeUser = await User.destroy({ where: { id: id } });
  if (!removeUser) {
    return 'Could not delete user';
  }
  return 'successfully removed';
};

export { getAllUsers, getUserById, getUserByEmail, insertUser, updateUserById };
export default { getAllUsers, getUserById, getUserByEmail, insertUser, updateUserById, deleteUserById };