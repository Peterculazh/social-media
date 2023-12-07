import { Inject, Injectable } from '@nestjs/common';
import { IPostService } from '../domain/contracts/i.post.service';
import { PostEntity } from '../domain/entities/post.entity';
import { CreatePostData, UpdatePostData } from '../domain/values-objects';
import { IPostRepository } from '../domain/contracts/i.post.repository';
import {
    PostCreationBadParamsException,
    PostUpdatingBadParamsException,
    PostNotFoundException,
    UnauthorizedPostActionException,
} from '../domain/exceptions';
import { BadParamsException } from '../../common/exceptions/BadParams.exception';
import validator from 'validator';

@Injectable()
export class PostService implements IPostService {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
    ) {}

    async createPost(postData: CreatePostData): Promise<PostEntity> {
        if (!postData) {
            throw new PostCreationBadParamsException('Post data is required');
        }
        if (!postData?.content || postData.content.length < 15) {
            throw new PostCreationBadParamsException(
                'Post content is required and should contain at least 15 characters.',
            );
        }
        if (!postData?.title || postData.title.length < 5) {
            throw new PostCreationBadParamsException(
                'Post title is required and should contain at least 5 characters.',
            );
        }
        if (!postData?.authorId || !validator.isUUID(postData.authorId, '4')) {
            throw new PostCreationBadParamsException(
                'Author id is required and should be a valid.',
            );
        }

        const newPost = PostEntity.create(postData);

        return this.postRepository.createPost(newPost);
    }

    async getPostById(id: string): Promise<PostEntity> {
        if (!id || !validator.isUUID(id, '4')) {
            throw new BadParamsException(
                'Post id is required and should be a valid.',
            );
        }

        const post = await this.postRepository.findById(id);

        if (!post) {
            throw new PostNotFoundException('Post not found');
        }

        return post;
    }

    async updatePost(postData: UpdatePostData): Promise<PostEntity> {
        if (!postData) {
            throw new PostUpdatingBadParamsException('Post data is required');
        }
        if (!postData.id || !validator.isUUID(postData.id, '4')) {
            throw new PostUpdatingBadParamsException(
                'Post id is required for updating and should be a valid.',
            );
        }
        if (!postData?.content || postData.content.length < 15) {
            throw new PostUpdatingBadParamsException(
                'Post content is required and should contain at least 15 characters.',
            );
        }
        if (!postData?.title || postData.title.length < 5) {
            throw new PostUpdatingBadParamsException(
                'Post title is required and should contain at least 5 characters.',
            );
        }
        if (!postData?.authorId || !validator.isUUID(postData.authorId, '4')) {
            throw new PostUpdatingBadParamsException(
                'Author is required and should be a valid.',
            );
        }

        const postToUpdate = await this.postRepository.findById(postData.id);

        if (!postToUpdate) {
            throw new PostNotFoundException('Post not found');
        }

        if (postToUpdate.authorId !== postData.authorId) {
            throw new UnauthorizedPostActionException(
                'You are not allowed to update this post',
            );
        }

        postToUpdate.update(postData);

        return this.postRepository.updatePost(postToUpdate);
    }
}
