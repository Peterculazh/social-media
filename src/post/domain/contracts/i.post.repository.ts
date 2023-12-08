import { PostEntity } from '../entities/post.entity';

export interface IPostRepository {
    createPost(post: PostEntity): Promise<PostEntity>;
    updatePost(post: PostEntity): Promise<PostEntity | null>;
    findById(id: string): Promise<PostEntity | null>;
}

export const IPostRepository = Symbol('IPostRepository');
