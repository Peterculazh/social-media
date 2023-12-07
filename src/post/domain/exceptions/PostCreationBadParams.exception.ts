import { BadParamsException } from '../../../common/exceptions/BadParams.exception';

export class PostCreationBadParamsException extends BadParamsException {
    constructor(message: string) {
        super(message);
        this.name = 'PostCreationBadParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PostCreationBadParamsException);
        }
    }
}
