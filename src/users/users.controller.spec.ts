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
  });
});
