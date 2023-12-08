import { InvalidValueObjectParams } from '../../../common/exceptions/InvalidValueObjectParams.exception';

export class InvalidPostValueObjectParamsException extends InvalidValueObjectParams {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidPostValueObjectParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(
                this,
                InvalidPostValueObjectParamsException,
            );
        }
    }
}
