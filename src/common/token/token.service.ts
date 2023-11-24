import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../contracts/i.token.service';
import { applicationConfig } from '../configs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService implements ITokenService {
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly jwtService: JwtService,
    ) {}

    async generateAccessToken(payload: {
        userId: string;
        email: string;
        nickname: string;
    }): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            expiresIn: applicationConfig.tokens.accessTokenTTL,
        });
    }

    async generateRefreshToken(userId: string): Promise<string> {
        const refreshToken = await this.jwtService.signAsync(
            {
                someAbsurdData: uuidv4(),
                andAnotherDataWhichYouHAVENTTOBREACK: uuidv4(),
            },
            {
                expiresIn: applicationConfig.tokens.refreshTokenTTL,
            },
        );
        await this.redis.set(
            refreshToken,
            userId,
            'EX',
            applicationConfig.tokens.refreshTokenTTL,
        );
        return refreshToken;
    }

    async getUserIdFromRefreshToken(token: string): Promise<string | null> {
        const refreshToken = await this.redis.get(token);
        if (!refreshToken) {
            return null;
        }

        return refreshToken;
    }

    async revokeRefreshToken(token: string): Promise<void> {
        await this.redis.del(token);
    }
}
