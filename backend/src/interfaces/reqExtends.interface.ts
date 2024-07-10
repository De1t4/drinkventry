import { Request } from 'express';
import { jwtPayload } from '../config/jwt';

export interface RequestExtends extends Request {
  user: jwtPayload;
}
