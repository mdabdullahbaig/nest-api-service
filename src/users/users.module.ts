import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';

/**
 * UsersModule is responsible for managing user-related components,
 * including controllers and providers for user operations.
 * Registers the User model with Mongoose for database integration.
 */
@Module({
  imports: [
    // Register the User model and schema with Mongoose
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
