import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ITokenService } from '../../contracts/i.token.service';
import { TokenService } from '../token.service';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';
import { RedisModule, getRedisToken } from '@liaoliaots/nestjs-redis';
import { redisConfig } from '../../configs';

describe('TokenService', () => {
    let service: ITokenService;

    let mockRedis: Partial<Redis>;

    beforeEach(async () => {
        mockRedis = {
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ITokenService,
                    useClass: TokenService,
                },
                {
                    provide: getRedisToken('default'),
                    useValue: mockRedis,
                },
            ],
            imports: [
                JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '60m' },
                }),
            ],
        }).compile();

        service = module.get<ITokenService>(ITokenService);
    });

    it('Should be defined', () => {
        expect(service).toBeDefined();
    });

    it(`Should generate access token`, async () => {
        const payload = {
            userId: `1`,
            email: `test@gmail.com`,
            nickname: `test`,
        };

        const accessToken = await service.generateAccessToken(payload);

        expect(accessToken).toBeDefined();
    });

    it(`Should generate refresh token`, async () => {
        const userId = `1`;
        const refreshToken = await service.generateRefreshToken(userId);

        expect(refreshToken).toBeDefined();
    });
});
