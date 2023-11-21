import { EntityConflict } from "../../../common/exceptions/EntityConflict.exception";

export class UserRegistrationConflictException extends EntityConflict {
    constructor(message: string) {
        super(message);
        this.name = 'UserRegistrationConflictException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UserRegistrationConflictException);
        }
    }
}
