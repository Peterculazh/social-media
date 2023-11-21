import { Inject, Injectable } from "@nestjs/common";
import { IAuthRepository } from "../domain/contracts/auth/i.auth.repository";
import { IAuthService } from "../domain/contracts/auth/i.auth.service";
import { IUserRepository } from "../domain/contracts/user/i.user.repository";
import { UserEntity } from "../domain/entities/user.entity";
import { UserRegistrationData } from "../domain/values-objects/auth/user-registration-data";
import { UserDto } from "../domain/contracts/dto/user.dto";
import { UserRegistrationBadParamsException } from "../domain/exceptions/UserRegistrationBadParams.exception";
import { UserRegistrationConflictException } from "../domain/exceptions/UserRegistrationConflict.exception";
import { UniqueConstraintFailed } from "../../common/exceptions/UniqueConstraintFailed.exception";

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(IAuthRepository) private readonly authRepository: IAuthRepository,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    ) { }

    async registerUser(userInfo: UserRegistrationData): Promise<UserDto> {
        if (!userInfo.email && !userInfo.nickname) {
            throw new UserRegistrationBadParamsException('Email or nickname is required');
        }

        const newUser = await UserEntity.create(userInfo);

        try {
            const registeredUser = await this.authRepository.registerUser(newUser);

            return {
                id: registeredUser.id,
                email: registeredUser.email,
                nickname: registeredUser.nickname,
                createdAt: registeredUser.createdAt,
                updatedAt: registeredUser.updatedAt,
            };
        } catch (error) {
            if (error instanceof UniqueConstraintFailed) {
                throw new UserRegistrationConflictException('Email or nickname already in use');
            }
            throw error;
        }
    }


}
