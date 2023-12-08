import { EntityNotFoundException } from '../../../common/exceptions/EntityNotFound.exception';

export class PostNotFoundException extends EntityNotFoundException {
    constructor(message: string) {
        super(message);
        this.name = 'PostNotFoundException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PostNotFoundException);
        }
    }
}
