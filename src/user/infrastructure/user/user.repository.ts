import { UserEntity } from 'src/user/domain/entities/user.entity';
import {
  IUserRepository,
  IUserRepositorySearchParamsOptionals,
} from '../../domain/contracts/user/i.user.repository';
import { PrismaService } from 'nestjs-prisma';
import { UserInfrastructureMapper } from './user.mapper';
import { Inject } from '@nestjs/common';
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(UserInfrastructureMapper)
    private readonly userMapper: UserInfrastructureMapper,
  ) {}

  async findUniqueUser(params: {
    email: string;
    nickname: string;
  }): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: params.email }, { nickname: params.nickname }],
      },
    });

    if (!user) {
      return null;
    }

    return this.userMapper.mapFromModelToEntity(user);
  }

  async findUser(
    params: IUserRepositorySearchParamsOptionals,
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        ...params,
      },
    });

    if (!user) {
      return null;
    }

    return this.userMapper.mapFromModelToEntity(user);
  }
}
