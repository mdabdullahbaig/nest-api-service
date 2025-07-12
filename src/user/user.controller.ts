import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  signUp(): string {
    return 'Sign Up';
  }

  @Post('sign-in')
  signIn(): string {
    return 'Sign In';
  }

  @Get('me')
  me(): string {
    return 'User Profile';
  }

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
