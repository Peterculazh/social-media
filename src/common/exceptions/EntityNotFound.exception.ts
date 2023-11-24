import { DomainException } from './Domain.exception';

export class EntityNotFoundException extends DomainException {
    constructor(message: string) {
        super(message);
        this.name = 'EntityNotFoundException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, EntityNotFoundException);
        }
    }
}
