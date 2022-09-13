import { NextFunction, Request, Response } from 'express';
import Usermodel from '../../model/users';
import { token } from '../../middleware/security';

import Auth from '../../types/auth';

const user = new Usermodel();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      'email' in req.body &&
      'user_name' in req.body &&
      'first_name' in req.body &&
      'last_name' in req.body &&
      'password' in req.body
    ) {
      const result = await user.create(req.body);
      res.json({ ...result });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'some needed data is missed',
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

export const getUsrList = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await user.getList();
    res.json({
      data: [...result],
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await user.getUser(parseInt(req.params.id));
    res.json({
      data: { ...result },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'some needed data is missed',
      });
      return;
    }
    const str: Array<string> = [];
    for (const [p, val] of Object.entries(req.body)) {
      if (p === 'password') {
        res.status(405).json({
          status: 'error',
          message: 'password reset is not allowed here',
        });
        return;
      } else {
        str.push(`${p} = '${(val as string).toLocaleLowerCase()}' `);
      }
    }
    const result = await user.updateUser(
      parseInt(req.params.id),
      str.toString()
    );
    res.json({ ...result });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await user.deleteUser(parseInt(req.params.id));
    res.json({ ...result });
  } catch (error) {
    next(error);
  }
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await user.auth(req.body.email, req.body.password);
    if (!result) {
      res.status(401).json({
        status: 'error',
        message: 'the username & password do not match please try again',
      });
      return;
    }
    const secret: string = token(result as Auth);
    res.json({
      status: `success login for ${result?.first_name}`,
      userData: { ...result, token: secret },
    });
  } catch (error) {
    next(error);
  }
};

// Get best sellers 5
export const bestusers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await user.bestUsers();
    res.json({
      data: [...result],
    });
  } catch (error) {
    next(error);
  }
};

//rest password
export const resPasswords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await user.resPassword(
      req.body.email,
      req.body.password,
      req.body.newPassword
    );
    if (!result) {
      res.status(401).json({
        status: 'error',
        message: 'the username & password do not match please try again',
      });
      return;
    }
    const secret: string = token(result as Auth);
    res.json({
      status: `success password reset for ${result?.first_name}`,
      userData: { ...result, token: secret },
    });
  } catch (error) {
    next(error);
  }
};
