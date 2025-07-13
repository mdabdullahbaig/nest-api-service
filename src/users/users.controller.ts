import {
  Body,
  Controller,
  Get,
  Param,
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

  /**
   * Handles GET requests to retrieve all users.
   * Calls the service to fetch all user documents from the database.
   * @returns Promise resolving to an array of user documents
   */
  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.usersService.findAllUsers();
  }

  /**
   * Handles GET requests to retrieve a user by ID.
   * Calls the service to fetch a user document by its unique identifier.
   * @param id - The ID of the user to retrieve
   * @returns Promise resolving to the user document with the specified ID
   */
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findUserById(id);
  }
}
