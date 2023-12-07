import { BadParamsException } from '../../../common/exceptions/BadParams.exception';

export class PostUpdatingBadParamsException extends BadParamsException {
    constructor(message) {
        super(message);
        this.name = 'PostUpdatingBadParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PostUpdatingBadParamsException);
        }
    }
}
