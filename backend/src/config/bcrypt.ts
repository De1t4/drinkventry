import { compare, hash } from 'bcrypt';

const hashPassword = async (password: string) => {
  try {
    return await hash(password, 10);
  } catch (error) {
    console.log(error);
    throw new Error('Error al realizar el hash');
  }
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { hashPassword, verifyPassword };
