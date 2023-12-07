import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { IPostService } from '../../domain/contracts/i.post.service';
import { CreatePostDto } from './dto/request';
import { CreatePostData, UpdatePostData } from '../../domain/values-objects';
import { AuthGuard } from '../../../common/presentation/api/guards/auth.guard';
import { GetUser } from '../../../common/presentation/api/decorators/getUser.decorator';
import { IUserToken } from '../../../common/token';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { BadRequestDto } from '../../../common/presentation/api/dto/badRequest.dto';
import { UpdatePostRequestDto } from './dto/request/updatePost.dto';
import { PostResponseDto } from './dto/response';
import { PostPresentationExceptionFilters } from './exceptions-filter/post.exceptions.filter';

@ApiTags(`Post`)
@UseFilters(PostPresentationExceptionFilters)
@Controller('post')
export class PostController {
    constructor(
        @Inject(IPostService) private readonly postService: IPostService,
    ) {}

    @ApiBearerAuth()
    @ApiCreatedResponse({ type: PostResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @UseGuards(AuthGuard)
    @Post('create')
    async createPost(
        @Body() dto: CreatePostDto,
        @GetUser() user: IUserToken,
    ): Promise<PostResponseDto> {
        const post = await this.postService.createPost(
            new CreatePostData({ authorId: user.userId, ...dto }),
        );

        return {
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }

    @ApiBearerAuth()
    @ApiOkResponse({ type: PostResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'The id of the post to update',
        type: 'string',
    })
    @UseGuards(AuthGuard)
    @Post('update/:id')
    async updatePost(
        @Param('id') postId: string,
        @Body() dto: UpdatePostRequestDto,
        @GetUser() user: IUserToken,
    ): Promise<PostResponseDto> {
        const post = await this.postService.updatePost(
            new UpdatePostData({
                id: postId,
                authorId: user.userId,
                ...dto,
            }),
        );

        return {
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }

    @ApiOkResponse({ type: PostResponseDto })
    @ApiNotFoundResponse({ type: BadRequestDto })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'The id of the post to get',
        type: 'string',
    })
    @Get('/:id')
    async getPostById(@Param('id') postId: string): Promise<PostResponseDto> {
        const post = await this.postService.getPostById(postId);

        return {
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }
}
