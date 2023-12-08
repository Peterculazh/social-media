import { InvalidEntityParamsException } from '../../../common/exceptions/InvalidEntityParams.exception';

export class InvalidPostUpdateParamsException extends InvalidEntityParamsException {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidPostUpdateParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidPostUpdateParamsException);
        }
    }
}
