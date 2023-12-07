import { InvalidPostValueObjectParamsException } from '../exceptions';

export class UpdatePostData {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly authorId: string;

    constructor({
        id,
        title,
        content,
        authorId,
    }: {
        id: string;
        title: string;
        content: string;
        authorId: string;
    }) {
        if (!id || !title || !content || !authorId) {
            throw new InvalidPostValueObjectParamsException(
                'Incorrect post data.',
            );
        }
        this.title = title;
        this.content = content;
        this.id = id;
        this.authorId = authorId;
    }
}
