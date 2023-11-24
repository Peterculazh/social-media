import { UserEntity } from '../../entities/user.entity';

export interface IAuthRepository {
    /**
     *  @throws UniqueConstraintFailed
     */
    registerUser(userInfo: UserEntity): Promise<UserEntity>;
}

export const IAuthRepository = Symbol('IAuthRepository');
