import { EntityNotFoundException } from '../../../common/exceptions/EntityNotFound.exception';

export class UserNotFoundException extends EntityNotFoundException {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserNotFoundException);
    }
  }
}
