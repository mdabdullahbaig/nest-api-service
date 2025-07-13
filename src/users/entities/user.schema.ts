import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * Mongoose schema for the User entity.
 * Represents a user with email, password, first name, last name, and optional phone number.
 */
@Schema()
export class User {
  /**
   * User's email address (must be unique and valid format)
   */
  @Prop({
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  })
  email: string;

  /**
   * User's password (minimum length: 6)
   */
  @Prop({ required: true, minlength: 6 })
  password: string;

  /**
   * User's first name
   */
  @Prop({ required: true })
  firstName: string;

  /**
   * User's last name
   */
  @Prop({ required: true })
  lastName: string;

  /**
   * User's phone number (optional)
   */
  @Prop({ required: false })
  phone?: string;
}

/**
 * Mongoose schema factory for the User class.
 */
export const UserSchema = SchemaFactory.createForClass(User);
