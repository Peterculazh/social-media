export interface ICryptService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export const ICryptService = Symbol('ICryptService');
