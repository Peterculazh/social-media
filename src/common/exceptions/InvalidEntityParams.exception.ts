import { DomainException } from './Domain.exception';

export class InvalidEntityParamsException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidEntityParamsException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidEntityParamsException);
    }
  }
}
