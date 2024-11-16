import { NextFunction, Request, Response } from 'express';
import createAsync from '../../utils/catchAsync';

export const checkAdminEndpoint = createAsync(
  (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.ADMIN_KEY !== process.env.ADMIN_KEY) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to use this endpoint' });
    }
    next();
  }
);
