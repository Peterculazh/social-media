import { User } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';

export class AuthUserInfrastructureMapper {
    mapFromEntityToModel(entity: UserEntity): User {
        return {
            id: entity.id,
            email: entity.email,
            nickname: entity.nickname,
            password: entity.password,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    mapFromModelToEntity(model: User): UserEntity {
        return UserEntity.reconstruct({
            id: model.id,
            email: model.email,
            nickname: model.nickname,
            password: model.password,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        });
    }
}
