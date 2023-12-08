import { Post } from '@prisma/client';
import { PostEntity } from '../domain/entities/post.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostMapper {
    mapFromEntityToModel(post: PostEntity): Post {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }

    mapFromModelToEntity(post: Post): PostEntity {
        return PostEntity.reconstruct({
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        });
    }
}
