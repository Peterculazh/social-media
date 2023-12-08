import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "nestjs-prisma";
import { IPostRepository } from "../domain/contracts/i.post.repository";
import { IPostService } from "../domain/contracts/i.post.service";
import { CreatePostData, UpdatePostData } from "../domain/values-objects";
import { PostService } from "../application/post.service";
import { PostEntity } from "../domain/entities/post.entity";

describe("POSITIVE: PostService", () => {
  let service: IPostService;
  let mockPostRepository: Partial<IPostRepository>;

  beforeEach(async () => {
    mockPostRepository = {
      createPost: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        {
          provide: IPostService,
          useClass: PostService,
        },
        {
          provide: IPostRepository,
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    service = module.get<IPostService>(IPostService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
  });

  it(`Should create post`, async () => {
    const someId = `22265cb9-3b49-47f1-883d-c19ff69f886d`;
    const testPost = new CreatePostData({
      title: "test title",
      content: "test content",
      authorId: someId,
    });

    mockPostRepository.createPost = jest.fn().mockImplementation(() =>
      Promise.resolve(
        PostEntity.reconstruct({
          id: someId,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...testPost,
        })
      )
    );

    const post = await service.createPost(testPost);

    expect(post).toBeDefined();
    expect(post.id).toBeDefined();
    expect(post.title).toBe(testPost.title);
    expect(post.content).toBe(testPost.content);
    expect(post.authorId).toBe(someId);
    expect(post.createdAt).toBeDefined();
    expect(post.updatedAt).toBeDefined();
  });

  it(`Should update post`, async () => {
    const someId = `22265cb9-3b49-47f1-883d-c19ff69f886d`;
    const testPost = new UpdatePostData({
      id: someId,
      title: "test title",
      content: "test content",
    });

    mockPostRepository.findById = jest.fn().mockImplementation(() =>
      Promise.resolve(
        PostEntity.reconstruct({
          id: someId,
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId: someId,
          ...testPost,
        })
      )
    );

    mockPostRepository.updatePost = jest.fn().mockImplementation(() =>
      Promise.resolve(
        PostEntity.reconstruct({
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId: someId,
          ...testPost,
        })
      )
    );

    const post = await service.updatePost(testPost);

    expect(post).toBeDefined();
    expect(post.id).toBeDefined();
    expect(post.title).toBe(testPost.title);
    expect(post.content).toBe(testPost.content);
    expect(post.authorId).toBe(someId);
    expect(post.createdAt).toBeDefined();
    expect(post.updatedAt).toBeDefined();
  });

  it(`Should get post by id`, async () => {
    const someId = `22265cb9-3b49-47f1-883d-c19ff69f886d`;
    const testPost = {
      id: someId,
      title: "test title",
      content: "test content",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: someId,
    };

    mockPostRepository.findById = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(PostEntity.reconstruct(testPost))
      );

    const post = await service.getPostById(someId);

    expect(post).toBeDefined();
    expect(post.id).toBeDefined();
    expect(post.title).toBe(testPost.title);
    expect(post.content).toBe(testPost.content);
    expect(post.authorId).toBe(someId);
    expect(post.createdAt).toBeDefined();
    expect(post.updatedAt).toBeDefined();
  });
});
