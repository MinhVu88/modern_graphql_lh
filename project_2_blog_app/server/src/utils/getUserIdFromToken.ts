import JWT from 'jsonwebtoken';
import { JWT_SIGNATURE } from '../signature';

export const getUserIdFromToken = (token: string) => {
  try {
    return JWT.verify(token, JWT_SIGNATURE) as { userId: number };
  } catch(error) {
    return null;
  }
};