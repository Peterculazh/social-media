import { Module } from '@nestjs/common';
import { UserController } from './presentation/api/user.controller';
import { AuthController } from './presentation/api/auth.controller';
import { AuthRepository } from './infrastructure/auth/auth.repository';
import { IAuthRepository } from './domain/contracts/auth/i.auth.repository';
import { IAuthService } from './domain/contracts/auth/i.auth.service';
import { AuthService } from './application/auth.service';
import { IUserRepository } from './domain/contracts/user/i.user.repository';
import { UserRepository } from './infrastructure/user/user.repository';
import { AuthUserInfrastructureMapper } from './infrastructure/auth/auth.mapper';
import { UserInfrastructureMapper } from './infrastructure/user/user.mapper';

@Module({
    providers: [
        {
            provide: IAuthService,
            useClass: AuthService,
        },
        AuthUserInfrastructureMapper,
        {
            provide: IAuthRepository,
            useClass: AuthRepository
        },
        UserInfrastructureMapper,
        {
            provide: IUserRepository,
            useClass: UserRepository,
        }
    ],
    controllers: [UserController, AuthController],
})
export class UserModule { }
