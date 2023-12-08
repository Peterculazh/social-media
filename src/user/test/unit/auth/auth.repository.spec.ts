import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule, PrismaService } from "nestjs-prisma";
import { IAuthRepository } from "../../../domain/contracts/auth/i.auth.repository";
import { AuthRepository } from "../../../infrastructure/auth/auth.repository";
import { UserEntity } from "../../../../user/domain/entities/user.entity";
import { AuthUserInfrastructureMapper } from "../../../../user/infrastructure/auth/auth.mapper";

describe("POSITIVE: AuthRepository", () => {
  let repository: IAuthRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        {
          provide: IAuthRepository,
          useClass: AuthRepository,
        },
        AuthUserInfrastructureMapper,
      ],
    }).compile();

    repository = module.get<IAuthRepository>(IAuthRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it("Should be defined", () => {
    expect(repository).toBeDefined();
  });

  it(`Should create user`, async () => {
    const testUser = await UserEntity.create({
      email: "test@gmail.com",
      nickname: "test",
      password: "testpassword",
    });
    const user = await repository.registerUser(testUser);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toBe(testUser.email);
    expect(user.nickname).toBe(testUser.nickname);
    expect(user.password).toBe(testUser.password);

    await prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  });
});
