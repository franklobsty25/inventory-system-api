import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ResponseService } from './response.service';
import CustomRequest from './custom.request';

const getToken = (payload: { id: string; email: string }) => {
  return jwt.sign(payload, process.env.SECRET || '', { expiresIn: '24h' });
};

const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers['authorization']?.split(' ')[1] as string;
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.SECRET || ''
    ) as JwtPayload;

    if (!decoded) {
      ResponseService.json(res, 401, 'Unathorized access');
      return;
    }

    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    ResponseService.json(res, error as Error);
  }
};

export { getToken, authenticate };
