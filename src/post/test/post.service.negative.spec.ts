import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "nestjs-prisma";
import { IPostRepository } from "../domain/contracts/i.post.repository";
import { IPostService } from "../domain/contracts/i.post.service";
import { PostService } from "../application/post.service";
import {
  PostCreationBadParamsException,
  PostNotFoundException,
  PostUpdatingBadParamsException,
  UnauthorizedPostActionException,
} from "../domain/exceptions";
import { BadParamsException } from "../../common/exceptions/BadParams.exception";
import { PostEntity } from "../domain/entities/post.entity";

describe("NEGATIVE: PostService", () => {
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

  describe(`Create post negative tests`, () => {
    it(`Should throw error due of invalid title for creating post`, async () => {
      const someId = `22265cb9-3b49-47f1-883d-c19ff69f886d`;

      expect.assertions(2);
      try {
        await service.createPost({
          title: "",
          content: "some test data lorem ipsum dolor sit amet",
          authorId: someId,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(PostCreationBadParamsException);
        expect(e.message).toBe(
          "Post title is required and should contain at least 5 characters."
        );
      }
    });

    it(`Should throw error due of invalid content for creating post`, async () => {
      const someId = `22265cb9-3b49-47f1-883d-c19ff69f886d`;

      expect.assertions(2);
      try {
        await service.createPost({
          title: "some test title for creating post",
          content: "",
          authorId: someId,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(PostCreationBadParamsException);
        expect(e.message).toBe(
          "Post content is required and should contain at least 15 characters."
        );
      }
    });

    it(`Should throw error due of invalid author id for creating post`, async () => {
      expect.assertions(2);
      try {
        await service.createPost({
          title: "some test title for creating post",
          content: "some test content for creating post",
          authorId: `somenot valid id`,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(PostCreationBadParamsException);
        expect(e.message).toBe("Author id is required and should be a valid.");
      }
    });
  });

  describe(`Update post negative tests`, () => {
    it(`Should throw error due of invalid title for updating post`, async () => {
      const someId = `22265cb9-3b49-47f1-883d-c19ff69f886d`;

      expect.assertions(2);
      try {
        await service.updatePost({
          id: someId,
          title: "",
          content: "some test data lorem ipsum dolor sit amet",
          authorId: someId,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(PostUpdatingBadParamsException);
        expect(e.message).toBe(
          "Post title is required and should contain at least 5 characters."
        );
      }
    });

    it(`Should throw error due of invalid content for updating post`, async () => {
      const someId = `22265cb9-3b49-47f1-883d-c19ff69f886d`;

      expect.assertions(2);
      try {
        await service.updatePost({
          id: someId,
          title: "some test title for updating post",
          content: "",
          authorId: someId,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(PostUpdatingBadParamsException);
        expect(e.message).toBe(
          "Post content is required and should contain at least 15 characters."
        );
      }
    });

    it(`Should throw error due of invalid post id for updating post`, async () => {
      expect.assertions(2);
      try {
        await service.updatePost({
          id: `somenot valid id`,
          title: "some test title for updating post",
          content: "some test content for updating post",
          authorId: `somenot valid id`,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(PostUpdatingBadParamsException);
        expect(e.message).toBe(
          "Post id is required for updating and should be a valid."
        );
      }
    });

    it(`Should throw error due of not found post for updating post`, async () => {
      mockPostRepository.findById = jest.fn().mockImplementation(() => null);

      expect.assertions(2);
      try {
        await service.updatePost({
          id: `22265cb9-3b49-47f1-883d-c19ff69f886d`,
          title: "some test title for updating post",
          content: "some test content for updating post",
          authorId: `22265cb9-3b49-47f1-883d-c19ff69f886d`,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(PostNotFoundException);
        expect(e.message).toBe("Post not found");
      }
    });

    it(`Should throw error because of updating post not by author`, async () => {
      mockPostRepository.findById = jest.fn().mockImplementation(() =>
        PostEntity.reconstruct({
          id: `22265cb9-3b49-47f1-883d-c19ff69f886d`,
          authorId: `9bec8df7-c726-4415-a333-72869447190e`,
          title: "some test title for updating post",
          content: "some test content for updating post",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      expect.assertions(2);
      try {
        await service.updatePost({
          id: `22265cb9-3b49-47f1-883d-c19ff69f886d`,
          title: "some test title for updating post",
          content: "some test content for updating post",
          authorId: `22265cb9-3b49-47f1-883d-c19ff69f886d`,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedPostActionException);
        expect(e.message).toBe("You are not allowed to update this post");
      }
    });
  });

  describe(`Get post by id negative tests`, () => {
    it(`Should throw error due of invalid id for search post by id`, async () => {
      expect.assertions(2);
      try {
        await service.getPostById(`some not valid id`);
      } catch (e) {
        expect(e).toBeInstanceOf(BadParamsException);
        expect(e.message).toBe("Post id is required and should be a valid.");
      }
    });

    it(`Should throw error due of not found post by id`, async () => {
      mockPostRepository.findById = jest.fn().mockImplementation(() => null);

      expect.assertions(2);
      try {
        await service.getPostById(`22265cb9-3b49-47f1-883d-c19ff69f886d`);
      } catch (e) {
        expect(e).toBeInstanceOf(PostNotFoundException);
        expect(e.message).toBe("Post not found");
      }
    });
  });
});
