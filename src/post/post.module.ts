import { Module } from '@nestjs/common';
import { IPostRepository } from './domain/contracts/i.post.repository';
import { PostRepository } from './infrastructure/post.repository';
import { PostMapper } from './infrastructure/post.mapper';
import { PostController } from './presentation/api/post.controller';
import { IPostService } from './domain/contracts/i.post.service';
import { PostService } from './application/post.service';

@Module({
    providers: [
        {
            provide: IPostRepository,
            useClass: PostRepository,
        },
        PostMapper,
        {
            provide: IPostService,
            useClass: PostService,
        },
    ],
    controllers: [PostController],
})
export class PostModule {}
