import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../application/auth.service';
import { IAuthService } from '../../../domain/contracts/auth/i.auth.service';
import { IAuthRepository } from '../../../domain/contracts/auth/i.auth.repository';
import { UserRegistrationData } from '../../../domain/values-objects/auth/user-registration-data';
import { IUserRepository } from '../../../domain/contracts/user/i.user.repository';
import { UniqueConstraintFailed } from '../../../../common/exceptions/UniqueConstraintFailed.exception';
import { UserLoginData } from '../../../domain/values-objects/auth/user-login-data';
import {
    UserLoginBadParamsException,
    UserRegistrationConflictException,
} from '../../../domain/exceptions';
import { ITokenService } from '../../../../common/contracts/i.token.service';
import { UserEntity } from '../../../domain/entities/user.entity';

describe('NEGATIVE: AuthService', () => {
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

    it(`Should throw error due of already existing user`, async () => {
        mockAuthRepository.registerUser = jest.fn().mockImplementation(() => {
            throw new UniqueConstraintFailed(
                'Email or nickname already in use',
            );
        });

        const testUser = new UserRegistrationData({
            email: 'test@gmail.com',
            nickname: 'test',
            password: 'test1P@ssword',
        });

        expect.assertions(2);
        try {
            await service.registerUser(testUser);
        } catch (error) {
            expect(error).toBeInstanceOf(UserRegistrationConflictException);
            expect(error.message).toBe('Email or nickname already in use');
        }
    });

    it(`Should throw error due of not found user during logging`, async () => {
        mockUserRepository.findUser = jest.fn().mockImplementation(() => null);

        const testUser = new UserLoginData({
            email: 'test@gmail.com',
            password: 'test1P@ssword',
        });

        expect.assertions(2);
        try {
            await service.loginUser(testUser);
        } catch (error) {
            expect(error).toBeInstanceOf(UserLoginBadParamsException);
            expect(error.message).toBe('Invalid credentials.');
        }
    });

    it(`Should throw error due of incorrect password during logging`, async () => {
        const reconstructUser = {
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
                Promise.resolve(UserEntity.reconstruct(reconstructUser)),
            );

        const testUser = new UserLoginData({
            email: 'test@gmail.com',
            password: 'test1P@ssword',
        });

        expect.assertions(2);
        try {
            await service.loginUser(testUser);
        } catch (error) {
            expect(error).toBeInstanceOf(UserLoginBadParamsException);
            expect(error.message).toBe('Invalid credentials.');
        }
    });
});
