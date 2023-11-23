import { PrismaService } from 'nestjs-prisma';
import { IAuthRepository } from '../../domain/contracts/auth/i.auth.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/domain/entities/user.entity';
import { AuthUserInfrastructureMapper } from './auth.mapper';
import { Prisma } from '@prisma/client';
import { UniqueConstraintFailed } from '../../../common/exceptions/UniqueConstraintFailed.exception';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AuthUserInfrastructureMapper)
    private readonly authMapper: AuthUserInfrastructureMapper,
  ) {}

  async registerUser(user: UserEntity): Promise<UserEntity> {
    try {
      const createdUser = await this.prisma.user.create({
        data: this.authMapper.mapFromEntityToModel(user),
      });

      return this.authMapper.mapFromModelToEntity(createdUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new UniqueConstraintFailed('Email or nickname already in use');
      }
      throw error;
    }
  }
}
