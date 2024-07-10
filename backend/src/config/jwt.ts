import jwt from 'jsonwebtoken';
const secretKey = String(process.env.JWT_SECRET_KEY);

export type jwtPayload = {
  id: string;
};

export const sign = (payload: jwtPayload) => {
  return new Promise((res, rej) => {
    jwt.sign(payload, secretKey, { algorithm: 'HS256', expiresIn: '4h' }, function (err, token) {
      return err ? rej(err) : res(token);
    });
  });
};

export const verify = (token: string) => {
  return new Promise<jwtPayload>((res, rej) => {
    jwt.verify(token, secretKey, function (err, decoded) {
      return err ? rej(err) : res(<jwtPayload>decoded);
    });
  });
};
