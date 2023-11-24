import validator from 'validator';
import { InvalidUserValueObjectParamsException } from '../../exceptions/InvalidUserValueObjectParams.exception';

export class UserRegistrationData {
    readonly email: string;
    readonly nickname: string;
    readonly password: string;

    constructor({
        email,
        nickname,
        password,
    }: {
        email: string;
        nickname: string;
        password: string;
    }) {
        if (!this.isValidEmail(email)) {
            throw new InvalidUserValueObjectParamsException('Invalid email');
        }

        if (nickname.length < 3 || !this.isValidNickname(nickname)) {
            throw new InvalidUserValueObjectParamsException('Invalid nickname');
        }

        if (password.length < 8 || !this.isValidPassword(password)) {
            throw new InvalidUserValueObjectParamsException(
                'Invalid password. It should contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol.',
            );
        }

        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    private isValidEmail(email: string): boolean {
        return validator.isEmail(email);
    }

    private isValidNickname(nickname: string): boolean {
        return validator.isAlphanumeric(nickname);
    }

    private isValidPassword(password: string): boolean {
        return validator.isStrongPassword(password);
    }
}
