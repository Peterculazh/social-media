import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../application/auth.service';
import { IAuthService } from '../../../domain/contracts/auth/i.auth.service';
import { IAuthRepository } from '../../../domain/contracts/auth/i.auth.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRegistrationData } from '../../../domain/values-objects/auth/user-registration-data';
import { IUserRepository } from '../../../domain/contracts/user/i.user.repository';
import { UserLoginData } from '../../../domain/values-objects/auth/user-login-data';
import { ITokenService } from '../../../../common/contracts/i.token.service';

describe('POSITIVE: AuthService', () => {
    let service: IAuthService;
    let mockAuthRepository: Partial<IAuthRepository>;
    let mockUserRepository: Partial<IUserRepository>;
    let mockTokenService: Partial<ITokenService>;

    beforeEach(async () => {
        mockAuthRepository = {
            registerUser: jest.fn(),
        };

        mockUserRepository = {
            findUser: jest.fn(),
        };

        mockTokenService = {
            generateAccessToken: jest.fn(),
            generateRefreshToken: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: IAuthService,
                    useClass: AuthService,
                },
                {
                    provide: IAuthRepository,
                    useValue: mockAuthRepository,
                },
                {
                    provide: IUserRepository,
                    useValue: mockUserRepository,
                },
                {
                    provide: ITokenService,
                    useValue: mockTokenService,
                },
            ],
        }).compile();

        service = module.get<IAuthService>(IAuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should be defined', () => {
        expect(service).toBeDefined();
    });

    it(`Should create user`, async () => {
        mockAuthRepository.registerUser = jest
            .fn()
            .mockImplementation((user) =>
                Promise.resolve(UserEntity.reconstruct(user)),
            );
        mockUserRepository.findUser = jest
            .fn()
            .mockImplementation(() => Promise.resolve(null));

        const testUser = new UserRegistrationData({
            email: 'test@gmail.com',
            nickname: 'test',
            password: 'test1P@ssword',
        });

        const user = await service.registerUser(testUser);

        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.email).toBe(testUser.email);
        expect(user.nickname).toBe(testUser.nickname);
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
        expect(user).not.toHaveProperty('password');
    });

    it(`Should authenticate user`, async () => {
        const testUser = {
            id: '6c99fbd0-b9ef-4a49-a187-b86aac825dc5',
            email: 'test@gmail.com',
            // testPassword - 1 round
            password:
                '$2a$04$eDVgyLremhmXIyw/N/csh.SJq8f2o8YW/rcG5e1V74WOwTFLwxuU6',
            nickname: 'test',
        };
        mockUserRepository.findUser = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve(UserEntity.reconstruct(testUser)),
            );

        mockTokenService.generateAccessToken = jest
            .fn()
            .mockImplementation(() => Promise.resolve(`some-access-token`));
        mockTokenService.generateRefreshToken = jest
            .fn()
            .mockImplementation(() => Promise.resolve(`some-refresh-token`));

        const result = await service.loginUser(
            new UserLoginData({
                email: testUser.email,
                password: 'testPassword',
            }),
        );

        expect(result).toBeDefined();
        expect(result.accessToken).toBeDefined();
        expect(result.refreshToken).toBeDefined();
    });
});
