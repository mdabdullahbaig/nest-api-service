import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  /**
   * Injects UsersService for user operations.
   * @param usersService - Service for managing users
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Handles POST requests to create a new user.
   * Applies validation to the request body using ValidationPipe.
   * @param body - Data Transfer Object containing user details
   * @returns Promise resolving to the created user document
   */
  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body);
  }
}
