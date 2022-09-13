import { Response, Request, NextFunction } from 'express';
import Error from '../../interface/error';
import { decode } from '../security';

// Handling unauthorized login Function
const handelUnAuthErr = (next: NextFunction) => {
  const error: Error = new Error('login Error: Please try again');
  error.status = 401;
  next(error);
};

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // get auth header
    const authHeader = req.get('Authorization');
    if (authHeader) {
      // got Bearer & token
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      // check if bearer & token
      if (token && bearer === 'bearer') {
        // check token validation
        if (decode(token)) {
          next();
        } else {
          // not valid Bear token
          handelUnAuthErr(next);
        }
      } else {
        // No Bear token
        handelUnAuthErr(next);
      }
    } else {
      // No Authorization header
      handelUnAuthErr(next);
    }
  } catch (error) {
    // error
    handelUnAuthErr(next);
  }
};

export default validateToken;
