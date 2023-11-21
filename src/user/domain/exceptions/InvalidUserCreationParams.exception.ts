import { InvalidEntityParamsException } from "../../../common/exceptions/InvalidEntityParams.exception";

export class InvalidUserCreationParamsException extends InvalidEntityParamsException {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidUserCreationParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidUserCreationParamsException);
        }
    }
}
