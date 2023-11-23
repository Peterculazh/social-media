import { RequireAtLeastOne } from '../../../../common/types/requiredAtLeastOne';
import { UserEntity } from '../../entities/user.entity';

export interface IUserRepositorySearchParams {
  id: string;
  email: string;
  nickname: string;
}

export type IUserRepositorySearchParamsOptionals = RequireAtLeastOne<
  IUserRepositorySearchParams,
  'id' | 'email' | 'nickname'
>;

export interface IUserRepository {
  findUniqueUser(params: {
    email: string;
    nickname: string;
  }): Promise<UserEntity | null>;
  findUser(
    params: IUserRepositorySearchParamsOptionals,
  ): Promise<UserEntity | null>;
}

export const IUserRepository = Symbol('IUserRepository');
