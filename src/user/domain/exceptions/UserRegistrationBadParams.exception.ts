import { BadParamsException } from '../../../common/exceptions/BadParams.exception';

export class UserRegistrationBadParamsException extends BadParamsException {
    constructor(message: string) {
        super(message);
        this.name = 'UserRegistrationBadParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserRegistrationBadParamsException);
        }
    }
}
