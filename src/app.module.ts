import { Module } from '@nestjs/common';
import { redisConfig } from './common/configs';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'nestjs-prisma';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    // RedisModule.forRoot({
    //   config: redisConfig,
    // }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warn',
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty' }
          : undefined,
        customLogLevel: function (req, res, error) {
          if (res.statusCode === 500) {
            // Log only 500 internal server error responses
            return 'error';
          }
          return 'silent'; // Silence all other logs
        },
      },
    }),
  ],
  exports: []
})
export class AppModule { }
