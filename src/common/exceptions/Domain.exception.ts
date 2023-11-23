export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainException);
    }
  }
}
