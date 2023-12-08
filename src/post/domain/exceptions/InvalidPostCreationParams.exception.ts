import { InvalidEntityParamsException } from '../../../common/exceptions/InvalidEntityParams.exception';

export class InvalidPostCreationParamsException extends InvalidEntityParamsException {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidPostCreationParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidPostCreationParamsException);
        }
    }
}
