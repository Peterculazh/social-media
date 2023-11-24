import { DomainException } from './Domain.exception';

export class InvalidValueObjectParams extends DomainException {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidValueObjectParams';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidValueObjectParams);
        }
    }
}
