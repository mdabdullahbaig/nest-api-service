import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

/**
 * Data Transfer Object for creating a new user.
 * Includes validation rules for each property.
 */
export class CreateUserDto {
  /**
   * User's email address (must be valid and not empty)
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User's password (must be a string and not empty)
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * User's first name (must be a string and not empty)
   */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  /**
   * User's last name (must be a string and not empty)
   */
  @IsString()
  @IsNotEmpty()
  lastName: string;

  /**
   * User's phone number (optional, must be a valid phone number for region 'IN')
   */
  @IsOptional()
  @IsPhoneNumber('IN') // default: any region
  @IsString()
  phone?: string;
}
