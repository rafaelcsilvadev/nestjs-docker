import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  // Criamos um mock para o UserService com os métodos que o controller chama
  const mockUserService = {
    createUser: jest.fn(),
    createPost: jest.fn(),
    getUserProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService, // Dizemos ao Nest para usar o mock em vez do service real
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call userService.createUser with correct data', async () => {
    const dto = { username: 'rafael', email: 'test@test.com', password: '123' };
    const expectedResult = { id: 1, ...dto };

    // Simulamos o retorno do service
    mockUserService.createUser.mockResolvedValue(expectedResult);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await controller.create(dto as any);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.createUser).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});
