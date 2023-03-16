import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dtos/user.dto';
import { User } from './interfaces/user.interface';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UserAvatar } from './interfaces/avatar.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'User data return with success.' })
  @Get(':userId')
  async findUserById(@Param('userId') userId): Promise<User> {
    const response = await this.userService.find(userId);
    return response;
  }

  @EventPattern({ cmd: 'User created.' })
  @Post()
  createUser(@Body() user: UserDTO): Promise<User> {
    return this.userService.create(user);
  }

  @EventPattern({ cmd: 'User deleted.' })
  @Delete(':userId')
  deleteAvatarByUserId(@Param('userId') userId): Promise<UserAvatar> {
    return this.userService.delete(userId);
  }

  @MessagePattern({ cmd: 'User avatar.' })
  @Get(':userId/avatar')
  findAvatarByUserId(@Param('userId') userId): Promise<string> {
    return this.userService.findAvatarByUserId(userId);
  }
}
