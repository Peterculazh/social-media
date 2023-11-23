import validator from 'validator';
import { InvalidUserValueObjectParamsException } from '../../exceptions/InvalidUserValueObjectParams.exception';

export class UserLoginData {
  readonly email: string;
  readonly password: string;

  constructor({ email, password }: { email: string; password: string }) {
    if (!this.isValidEmail(email)) {
      throw new InvalidUserValueObjectParamsException('Invalid email');
    }

    if (password?.length < 8) {
      throw new InvalidUserValueObjectParamsException('Invalid password');
    }

    this.email = email;
    this.password = password;
  }

  private isValidEmail(email: string): boolean {
    return validator.isEmail(email);
  }
}
