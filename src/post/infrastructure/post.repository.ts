import { PrismaService } from 'nestjs-prisma';
import { IPostRepository } from '../domain/contracts/i.post.repository';
import { PostEntity } from '../domain/entities/post.entity';
import { PostMapper } from './post.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository implements IPostRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly postMapper: PostMapper,
    ) {}

    async createPost(post: PostEntity): Promise<PostEntity> {
        const createdPost = await this.prisma.post.create({
            data: this.postMapper.mapFromEntityToModel(post),
        });

        return this.postMapper.mapFromModelToEntity(createdPost);
    }

    async updatePost(post: PostEntity): Promise<PostEntity> {
        const updatedPost = await this.prisma.post.update({
            where: {
                id: post.id,
            },
            data: this.postMapper.mapFromEntityToModel(post),
        });

        if (!updatedPost) {
            return null;
        }

        return this.postMapper.mapFromModelToEntity(updatedPost);
    }

    async findById(id: string): Promise<PostEntity> {
        const post = await this.prisma.post.findUnique({
            where: {
                id,
            },
        });

        if (!post) {
            return null;
        }

        return this.postMapper.mapFromModelToEntity(post);
    }
}
