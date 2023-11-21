import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../application/auth.service';
import { IAuthService } from '../../../domain/contracts/auth/i.auth.service';
import { IAuthRepository } from '../../../domain/contracts/auth/i.auth.repository';
import { UserRegistrationData } from '../../../domain/values-objects/auth/user-registration-data';
import { IUserRepository } from '../../../domain/contracts/user/i.user.repository';
import { UserRegistrationConflictException } from '../../../domain/exceptions/UserRegistrationConflict.exception';
import { UniqueConstraintFailed } from '../../../../common/exceptions/UniqueConstraintFailed.exception';

describe('NEGATIVE: AuthService', () => {
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

    it(`Should throw error due of already existing user`, async () => {
        mockAuthRepository.registerUser = jest.fn().mockImplementation((_user) => { throw new UniqueConstraintFailed('Email or nickname already in use'); });

        const testUser = new UserRegistrationData({
            email: 'test@gmail.com',
            nickname: 'test',
            password: 'test1P@ssword',
        });

        await expect(service.registerUser(testUser)).rejects.toThrow(UserRegistrationConflictException);
    });

});
