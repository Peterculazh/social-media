import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule, PrismaService } from "nestjs-prisma";
import { IPostRepository } from "../domain/contracts/i.post.repository";
import { PostRepository } from "../infrastructure/post.repository";
import { PostMapper } from "../infrastructure/post.mapper";
import { PostEntity } from "../domain/entities/post.entity";
import { TestDB } from "../../../test/db/TestDB";
import { IAuthService } from "../../user/domain/contracts/auth/i.auth.service";
import { AuthService } from "../../user/application/auth.service";
import { IAuthRepository } from "../../user/domain/contracts/auth/i.auth.repository";
import { AuthRepository } from "../../user/infrastructure/auth/auth.repository";
import { IUserRepository } from "../../user/domain/contracts/user/i.user.repository";
import { UserRepository } from "../../user/infrastructure/user/user.repository";
import { ITokenService } from "../../common/contracts/i.token.service";
import { AuthUserInfrastructureMapper } from "../../user/infrastructure/auth/auth.mapper";
import { UserInfrastructureMapper } from "../../user/infrastructure/user/user.mapper";
import { UserEntity } from "../../user/domain/entities/user.entity";

describe("POSITIVE: PostRepository", () => {
  let repository: IPostRepository;
  let authRepository: IAuthRepository;
  let prismaService: PrismaService;

  const createTestAuthor = async (): Promise<UserEntity> => {
    const testUser = await UserEntity.create({
      email: "test@gmail.com",
      nickname: "test",
      password: "test!Password123",
    });
    return await authRepository.registerUser(testUser);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        {
          provide: IPostRepository,
          useClass: PostRepository,
        },
        {
          provide: IAuthService,
          useClass: AuthService,
        },
        {
          provide: IAuthRepository,
          useClass: AuthRepository,
        },
        {
          provide: IUserRepository,
          useClass: UserRepository,
        },
        {
          provide: ITokenService,
          useValue: {
            generateAccessToken: jest.fn(),
            generateRefreshToken: jest.fn(),
            getUserIdFromRefreshToken: jest.fn(),
            revokeRefreshToken: jest.fn(),
          },
        },
        PostMapper,
        AuthUserInfrastructureMapper,
        UserInfrastructureMapper,
      ],
    }).compile();

    repository = module.get<IPostRepository>(IPostRepository);
    authRepository = module.get<IAuthRepository>(IAuthRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
    await new TestDB().initializeDB();
  });

  it("Should be defined", () => {
    expect(repository).toBeDefined();
  });

  it(`Should create post`, async () => {
    const testAuthor = await createTestAuthor();

    const testPost = await PostEntity.create({
      title: "test title",
      content: "test content",
      authorId: testAuthor.id,
    });

    const post = await repository.createPost(testPost);

    expect(post).toBeDefined();
    expect(post.id).toBeDefined();
    expect(post.title).toBe(testPost.title);
    expect(post.content).toBe(testPost.content);
    expect(post.authorId).toBe(testAuthor.id);
    expect(post.createdAt).toBeDefined();
    expect(post.updatedAt).toBeDefined();
  });

  it(`Should find post by id`, async () => {
    const testAuthor = await createTestAuthor();

    const testPost = await PostEntity.create({
      title: "test title",
      content: "test content",
      authorId: testAuthor.id,
    });

    const createdPost = await repository.createPost(testPost);

    const post = await repository.findById(createdPost.id);

    expect(post).toBeDefined();
    expect(post.id).toBeDefined();
    expect(post.title).toBe(testPost.title);
    expect(post.content).toBe(testPost.content);
    expect(post.authorId).toBe(testAuthor.id);
    expect(post.createdAt).toBeDefined();
    expect(post.updatedAt).toBeDefined();
  });

  it(`Should update post`, async () => {
    const testAuthor = await createTestAuthor();

    const testPost = await PostEntity.create({
      title: "test title",
      content: "test content",
      authorId: testAuthor.id,
    });

    const createdPost = await repository.createPost(testPost);

    const postToUpdate = PostEntity.reconstruct(createdPost);

    const testUpdatedTitle = "updated title";
    const testUpdatedContent = "updated content";

    postToUpdate.title = testUpdatedTitle;
    postToUpdate.content = testUpdatedContent;

    const updatedPost = await repository.updatePost(postToUpdate);

    expect(updatedPost).toBeDefined();
    expect(updatedPost.id).toBeDefined();
    expect(updatedPost.title).toBe(testUpdatedTitle);
    expect(updatedPost.content).toBe(testUpdatedContent);
    expect(updatedPost.authorId).toBe(testAuthor.id);
    expect(updatedPost.createdAt).toBeDefined();
    expect(updatedPost.updatedAt).toBeDefined();
    expect(updatedPost.updatedAt).not.toBe(postToUpdate.updatedAt);
  });
});
