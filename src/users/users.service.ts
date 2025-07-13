import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
/**
 * Service for managing user operations.
 */
export class UsersService {
  /**
   * Injects the User model for database operations.
   * @param userModel - Mongoose model for User
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Creates a new user in the database.
   * Checks for an existing user by email before creation.
   * Throws BadRequestException if user already exists.
   * Handles and propagates database errors.
   * @param userDate - Data Transfer Object containing user details
   * @returns Promise resolving to the created user document
   * @throws BadRequestException if user already exists
   * @throws Error if there is a database or other error
   */
  async createUser(userDate: CreateUserDto): Promise<User> {
    try {
      // Check if a user with the given email already exists
      const existingUser = await this.userModel.findOne({
        email: userDate.email,
      });

      if (existingUser) {
        // If user exists, throw a BadRequestException
        throw new BadRequestException('User already exists!');
      }

      // Create and save the new user
      const newUser = new this.userModel(userDate);
      return await newUser.save();
    } catch (error) {
      // Propagate BadRequestException, handle other errors generically
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns Promise resolving to an array of user documents
   * @throws Error if there is a database or other error
   */
  async findAllUsers(): Promise<User[]> {
    try {
      // Fetch all users from the database
      return await this.userModel.find().exec();
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  /**
   * Retrieves a user by their ID from the database.
   * Throws BadRequestException if user is not found.
   * @param id - The unique identifier of the user
   * @returns Promise resolving to the user document
   * @throws BadRequestException if user is not found
   * @throws Error if there is a database or other error
   */
  async findUserById(id: string): Promise<User> {
    try {
      // Fetch user by ID from the database
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        // If user is not found, throw BadRequestException
        throw new BadRequestException('User not found!');
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}
