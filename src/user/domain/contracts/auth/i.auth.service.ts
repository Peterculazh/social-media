import { UserRegistrationData } from "../../values-objects/auth/user-registration-data";
import { UserDto } from "../dto/user.dto";

export interface IAuthService {
    registerUser(userInfo: UserRegistrationData): Promise<UserDto>;
}

export const IAuthService = Symbol('IAuthService');
