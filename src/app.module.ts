import { Module } from '@nestjs/common';
import { redisConfig } from './common/configs';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'nestjs-prisma';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LoggerModule } from 'nestjs-pino';
import { JwtModule } from '@nestjs/jwt';
import { ITokenService } from './common/contracts/i.token.service';
import { TokenService } from './common/token/token.service';
import { PostModule } from './post/post.module';
import { AuthGuard } from './common/presentation/api/guards/auth.guard';

@Module({
    imports: [
        RedisModule.forRoot({
            config: redisConfig,
        }),
        PrismaModule.forRoot({
            isGlobal: true,
        }),
        LoggerModule.forRoot({
            pinoHttp: {
                level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warn',
                transport:
                    process.env.NODE_ENV !== 'production'
                        ? { target: 'pino-pretty' }
                        : undefined,
                customLogLevel: function (req, res) {
                    if (res.statusCode === 500) {
                        // Log only 500 internal server error responses
                        return 'error';
                    }
                    return 'silent'; // Silence all other logs
                },
            },
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            global: true,
        }),
        UserModule,
        PostModule,
    ],
    providers: [
        {
            provide: ITokenService,
            useClass: TokenService,
        },
        AuthGuard,
    ],
    exports: [
        {
            provide: ITokenService,
            useClass: TokenService,
        },
    ],
})
export class AppModule {}
