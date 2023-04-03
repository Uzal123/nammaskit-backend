import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from 'src/user/users.service';
import { User, UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authToken: string | null = req.headers['authorization']
      ?.replace(/^Bearer\s/, '')
      .trim();

    if (!authToken) {
      return false;
    }
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!id) {
      return false;
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      return false;
    }

    if (user.role) {
      return roles.includes(user.role);
    }

    return false;
  }
}
