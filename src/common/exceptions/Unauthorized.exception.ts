import { DomainException } from './Domain.exception';

export class UnauthorizedException extends DomainException {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedException';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedException);
        }
    }
}
