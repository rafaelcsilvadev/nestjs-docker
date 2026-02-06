import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { EntityManager } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let entityManager: EntityManager;

  // Criamos um objeto mock com os métodos que o service usa
  const mockEntityManager = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          // Precisamos dizer ao Nest para usar o nosso mock quando o EntityManager for pedido
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Exemplo de como testar um método agora:
  it('should call entityManager.save when creating a user', async () => {
    const dto = { username: 'rafael', email: 'test@test.com', password: '123' };
    mockEntityManager.create.mockReturnValue(dto);
    mockEntityManager.save.mockResolvedValue({ id: 1, ...dto });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await service.createUser(dto as any);

    expect(mockEntityManager.create).toHaveBeenCalled();
    expect(mockEntityManager.save).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });
});
