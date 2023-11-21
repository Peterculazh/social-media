import { DomainException } from "./Domain.exception";

export class BadParamsException extends DomainException {
    constructor(message: string) {
        super(message);
        this.name = 'BadParamsException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadParamsException);
        }
    }
}
