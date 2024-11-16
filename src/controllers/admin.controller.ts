import { Request, Response } from 'express';
import createAsync from '../utils/catchAsync';
import { ResponseBody } from '../utils/http';
import { createAdminService } from '../services/admin.service';

export interface RequestCreateAdminBody {
  email: string;
  password: string;
}

export const createAdmin = createAsync(
  async (req: Request, res: Response): Promise<any> => {
    const body: RequestCreateAdminBody = req.body;

    const response: ResponseBody = await createAdminService(body);

    res.status(response.statusCode).json(response);
  }
);
