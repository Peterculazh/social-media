import { BadParamsException } from '../../../common/exceptions/BadParams.exception';

export class UserLoginBadParamsException extends BadParamsException {
    constructor(message: string) {
        super(message);
        this.name = 'UserLoginBadParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserLoginBadParamsException);
        }
    }
}
