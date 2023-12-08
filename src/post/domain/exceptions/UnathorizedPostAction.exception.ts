import { UnauthorizedException } from '../../../common/exceptions';

export class UnauthorizedPostActionException extends UnauthorizedException {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedPostActionException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedPostActionException);
        }
    }
}
