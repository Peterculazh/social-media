import { DomainException } from './Domain.exception';

export class UniqueConstraintFailed extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'UniqueConstraintFailed';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintFailed);
    }
  }
}
