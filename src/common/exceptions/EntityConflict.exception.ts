import { DomainException } from "./Domain.exception";

export class EntityConflict extends DomainException {
    constructor(message: string) {
        super(message);
        this.name = 'EntityConflict';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, EntityConflict);
        }
    }
}
