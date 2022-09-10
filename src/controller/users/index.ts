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
    const result = await user.create(req.body);
    res.json({ ...result });
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
    const result = await user.getUser(req.params.id as unknown as string);
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
    const str: Array<string> = [];
    for (const [p, val] of Object.entries(req.body)) {
      if (p !== 'password') {
        str.push(`${p} = '${(val as string).toLocaleLowerCase()}' `);
      } else {
        str.push(`${p} = '${val}' `);
      }
    }
    const result = await user.updateUser(
      req.params.id as unknown as string,
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
    const result = await user.deleteUser(req.params.id as unknown as string);
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
