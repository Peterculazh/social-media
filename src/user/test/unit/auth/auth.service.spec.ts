import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../application/auth.service';
import { IAuthService } from '../../../domain/contracts/auth/i.auth.service';
import { IAuthRepository } from '../../../domain/contracts/auth/i.auth.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRegistrationData } from '../../../domain/values-objects/auth/user-registration-data';
import { IUserRepository } from '../../../domain/contracts/user/i.user.repository';

describe('POSITIVE: AuthService', () => {
    let service: IAuthService;
    let mockAuthRepository: Partial<IAuthRepository>;
    let mockUserRepository: Partial<IUserRepository>;

    beforeEach(async () => {
        mockAuthRepository = {
            registerUser: jest.fn(),
        };

        mockUserRepository = {
            findUser: jest.fn(),
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: IAuthService,
                useClass: AuthService,
            }, {
                provide: IAuthRepository,
                useValue: mockAuthRepository,
            }, {
                provide: IUserRepository,
                useValue: mockUserRepository,
            }],
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
        mockAuthRepository.registerUser = jest.fn().mockImplementation((user) => Promise.resolve(UserEntity.reconstruct(user)));
        mockUserRepository.findUser = jest.fn().mockImplementation((_user) => Promise.resolve(null));

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

});
