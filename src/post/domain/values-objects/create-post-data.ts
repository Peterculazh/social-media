import { InvalidPostValueObjectParamsException } from '../exceptions';

export class CreatePostData {
    readonly title: string;
    readonly content: string;
    readonly authorId: string;

    constructor({
        title,
        content,
        authorId,
    }: {
        title: string;
        content: string;
        authorId: string;
    }) {
        if (!title || !content || !authorId) {
            throw new InvalidPostValueObjectParamsException(
                'Incorrect post data.',
            );
        }
        this.title = title;
        this.content = content;
        this.authorId = authorId;
    }
}
