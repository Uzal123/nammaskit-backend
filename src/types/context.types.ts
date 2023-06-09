import { Request, Response } from 'express';
import { User } from '../models/user.model';

type Ctx = {
  req: Request & { user?: Pick<User, 'email'> };
  res: Response;
};

export default Ctx;
