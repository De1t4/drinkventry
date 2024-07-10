import { NextFunction, Request, Response } from 'express';
import { verify } from '../config/jwt';
import { HttpCodes } from '../utils';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obtener el jwt que genera el usuario
    const jwtByUser = req.headers.authorization || '';
    if (!jwtByUser) {
      res.status(HttpCodes.CODE_BAD_REQUEST).json({
        message: 'No se recibió el token',
      });
      return;
    }

    // Separo el Bearer y el token solo devuelvo el token
    const jwt = jwtByUser.split(' ').pop();
    if (!jwt) {
      res.status(HttpCodes.CODE_BAD_REQUEST).json({
        message: 'Token no proporcionado',
      });
      return;
    }

    const validUser = await verify(jwt);

    if (!validUser) {
      res.status(HttpCodes.CODE_BAD_REQUEST).json({
        message: 'Token inválido',
      });
      return;
    }
    req.user = validUser;
    next();
  } catch (error) {
    res.status(HttpCodes.CODE_UNAUTHORIZED).json({
      message: 'Sesión inválida',
    });
  }
};

export { validateJWT };
