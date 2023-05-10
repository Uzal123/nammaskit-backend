import { UserResponse } from '../common/dto/user.response';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { MyDeptSemResponse } from './dto/response.mydeptsem';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserResponse, {
    name: 'me',
    description: 'Me',
  })
  @UseGuards(RolesGuard)
  @Roles('ad', 'st', 'fa', 'hod', 'pr', 'pa')
  async me() {
    return this.usersService.me();
  }


  @Query(() => User, {
    name: 'userbyID',
    description: 'get user by UserId',
  })
  @UseGuards(RolesGuard)
  @Roles('ad', 'st', 'fa', 'hod', 'pr', 'pa')
  async user(@Args('userId') userId: string) {
    return this.usersService.findOneById(userId);
  }
}
