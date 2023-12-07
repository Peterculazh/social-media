import { PostEntity } from '../entities/post.entity';
import { CreatePostData, UpdatePostData } from '../values-objects';

export interface IPostService {
    createPost(postData: CreatePostData): Promise<PostEntity>;
    updatePost(postData: UpdatePostData): Promise<PostEntity>;
    getPostById(id: string): Promise<PostEntity>;
}

export const IPostService = Symbol('IPostService');
