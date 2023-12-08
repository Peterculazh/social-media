import { v4 as uuidv4 } from 'uuid';
import {
    InvalidPostCreationParamsException,
    InvalidPostUpdateParamsException,
} from '../exceptions';
import { UserEntity } from '../../../user/domain/entities/user.entity';

export class PostEntity {
    private _id: string;
    private _title: string;
    private _content: string;
    private readonly _authorId: string;
    private readonly _createdAt: Date;
    private _updatedAt: Date;
    private _author?: UserEntity;

    private constructor({
        id,
        title,
        content,
        createdAt,
        updatedAt,
        authorId,
        author,
    }: {
        id: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        author?: UserEntity;
    }) {
        this._id = id;
        this._title = title;
        this._content = content;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._author = author;
        this._authorId = authorId;
    }

    static create({
        title,
        content,
        authorId,
    }: {
        title: string;
        content: string;
        authorId: string;
    }): PostEntity {
        if (!title || !content) {
            throw new InvalidPostCreationParamsException(
                'Title and content are required for creating a post.',
            );
        }

        return new PostEntity({
            id: uuidv4(),
            title,
            content,
            authorId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static reconstruct(params: {
        id: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        author?: UserEntity;
    }): PostEntity {
        if (!params.id || !params.title || !params.content) {
            throw new InvalidPostCreationParamsException(
                'Incorrect post data.',
            );
        }

        return new PostEntity(params);
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (!value) {
            throw new InvalidPostUpdateParamsException(
                'Title is required for a post.',
            );
        }
        this._updatedAt = new Date();
        this._title = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        if (!value) {
            throw new InvalidPostUpdateParamsException(
                'Content is required for a post.',
            );
        }
        this._updatedAt = new Date();
        this._content = value;
    }

    get authorId(): string {
        return this._authorId;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get author(): UserEntity | undefined {
        return this._author;
    }

    update({ title, content }: { title: string; content: string }): void {
        if (!title || !content) {
            throw new InvalidPostUpdateParamsException(
                'Title and content are required for updating a post.',
            );
        }
        this.title = title;
        this.content = content;
    }
}
