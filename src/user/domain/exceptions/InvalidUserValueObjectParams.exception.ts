import { InvalidValueObjectParams } from "../../../common/exceptions/InvalidValueObjectParams.exception";

export class InvalidUserValueObjectParamsException extends InvalidValueObjectParams {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidUserValueObjectParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidUserValueObjectParamsException);
        }
    }
}
