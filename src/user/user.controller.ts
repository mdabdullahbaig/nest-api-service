import { Controller, Get, Header, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @Header('Content-Type', 'application/json')
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
}
