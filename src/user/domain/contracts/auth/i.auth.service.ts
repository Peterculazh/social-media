import { UserLoginData } from '../../values-objects/auth/user-login-data';
import { UserRegistrationData } from '../../values-objects/auth/user-registration-data';
import { UserDto } from '../dto/user.dto';
import { UserLoginDto } from '../dto/userLogin.dto';

export interface IAuthService {
  registerUser(userInfo: UserRegistrationData): Promise<UserDto>;
  loginUser(userInfo: UserLoginData): Promise<UserLoginDto>;
  logoutUser(token: string): Promise<void>;
}

export const IAuthService = Symbol('IAuthService');
