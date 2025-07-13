import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

/**
 * Unit tests for UsersController
 */
describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  // Mock implementation of UsersService
  const mockUsersService = {
    createUser: jest.fn(),
    findAllUsers: jest.fn(),
    findUserById: jest.fn(),
  };

  /**
   * Set up a fresh UsersController instance before each test
   */
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    /**
     * Should create a user and return the user object
     */
    it('should create a user and return the user object', async () => {
      const dto: CreateUserDto = {
        email: 'test.mail@gmail.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'Mail',
        phone: '9876543210',
      };
      const result = { ...dto, _id: 'mockId' };
      mockUsersService.createUser.mockResolvedValue(result);

      // Call the createUser method and expect the result to match
      expect(await usersController.createUser(dto)).toEqual(result);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(dto);
    });

    /**
     * Should throw BadRequestException if user already exists
     */
    it('should throw BadRequestException if user already exists', async () => {
      const dto: CreateUserDto = {
        email: 'test.mail@gmail.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'Mail',
        phone: '9876543210',
      };
      mockUsersService.createUser.mockRejectedValue(
        new BadRequestException('User already exists!'),
      );

      // Expect signUp to throw BadRequestException
      await expect(usersController.createUser(dto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockUsersService.createUser).toHaveBeenCalledWith(dto);
    });

    /**
     * Should throw generic error if service throws
     */
    it('should throw generic error if service throws', async () => {
      const dto: CreateUserDto = {
        email: 'test.mail@gmail.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'Mail',
        phone: '9876543210',
      };
      mockUsersService.createUser.mockRejectedValue(
        new Error('Database error'),
      );

      // Expect createUser to throw a generic error
      await expect(usersController.createUser(dto)).rejects.toThrow(
        'Database error',
      );
      expect(mockUsersService.createUser).toHaveBeenCalledWith(dto);
    });

    /**
     * Should throw validation error if required fields are missing
     */
    it('should throw validation error if required fields are missing', async () => {
      // Missing email and password
      const invalidDto: Partial<CreateUserDto> = {
        firstName: 'Test',
        lastName: 'Mail',
        phone: '9876543210',
      };
      // Simulate service throwing a validation error
      mockUsersService.createUser.mockRejectedValue(
        new BadRequestException(
          'Validation failed: email and password are required',
        ),
      );

      await expect(
        usersController.createUser(invalidDto as CreateUserDto),
      ).rejects.toThrow(BadRequestException);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(invalidDto);
    });

    /**
     * Should throw validation error if extra fields are provided
     */
    it('should throw validation error if extra fields are provided', async () => {
      // DTO with an extra field not defined in CreateUserDto
      const invalidDto: any = {
        email: 'test.mail@gmail.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'Mail',
        phone: '9876543210',
        extraField: 'unexpected', // extra field
      };
      // Simulate service throwing a validation error
      mockUsersService.createUser.mockRejectedValue(
        new BadRequestException(
          'Validation failed: extra fields are not allowed',
        ),
      );

      await expect(
        usersController.createUser(invalidDto as CreateUserDto),
      ).rejects.toThrow(BadRequestException);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(invalidDto);
    });
  });

  describe('findAllUsers', () => {
    /**
     * Should return an array of users
     */
    it('should return an array of users', async () => {
      const users = [
        {
          _id: '1',
          email: 'user1@mail.com',
          password: 'pass',
          firstName: 'User',
          lastName: 'One',
          phone: '1234567890',
        },
        {
          _id: '2',
          email: 'user2@mail.com',
          password: 'pass',
          firstName: 'User',
          lastName: 'Two',
          phone: '0987654321',
        },
      ];
      mockUsersService.findAllUsers = jest.fn().mockResolvedValue(users);
      expect(await usersController.findAllUsers()).toEqual(users);
      expect(mockUsersService.findAllUsers).toHaveBeenCalled();
    });

    /**
     * Should return an empty array if no users exist
     */
    it('should return an empty array if no users exist', async () => {
      mockUsersService.findAllUsers = jest.fn().mockResolvedValue([]);
      expect(await usersController.findAllUsers()).toEqual([]);
      expect(mockUsersService.findAllUsers).toHaveBeenCalled();
    });

    /**
     * Should throw error if service throws
     */
    it('should throw error if service throws', async () => {
      mockUsersService.findAllUsers = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));
      await expect(usersController.findAllUsers()).rejects.toThrow(
        'Database error',
      );
      expect(mockUsersService.findAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    /**
     * Should return a user by ID
     */
    it('should return a user by ID', async () => {
      const user = {
        _id: '1',
        email: 'user1@mail.com',
        password: 'pass',
        firstName: 'User',
        lastName: 'One',
        phone: '1234567890',
      };
      mockUsersService.findUserById = jest.fn().mockResolvedValue(user);
      expect(await usersController.getUserById('1')).toEqual(user);
      expect(mockUsersService.findUserById).toHaveBeenCalledWith('1');
    });

    /**
     * Should throw BadRequestException if user not found
     */
    it('should throw BadRequestException if user not found', async () => {
      mockUsersService.findUserById = jest
        .fn()
        .mockRejectedValue(new BadRequestException('User not found!'));
      await expect(usersController.getUserById('999')).rejects.toThrow(
        BadRequestException,
      );
      expect(mockUsersService.findUserById).toHaveBeenCalledWith('999');
    });

    /**
     * Should throw BadRequestException if ID format is invalid
     */
    it('should throw BadRequestException if ID format is invalid', async () => {
      // Simulate service throwing a validation error for invalid ID format
      mockUsersService.findUserById = jest
        .fn()
        .mockRejectedValue(new BadRequestException('Invalid user ID format'));
      await expect(usersController.getUserById('invalid-id')).rejects.toThrow(
        BadRequestException,
      );
      expect(mockUsersService.findUserById).toHaveBeenCalledWith('invalid-id');
    });

    /**
     * Should throw error if service throws
     */
    it('should throw error if service throws', async () => {
      mockUsersService.findUserById = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));
      await expect(usersController.getUserById('1')).rejects.toThrow(
        'Database error',
      );
      expect(mockUsersService.findUserById).toHaveBeenCalledWith('1');
    });
  });
});
