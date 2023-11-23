import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { RegisterUserDto } from './dto/requests/auth/registerUser.dto';
import { IAuthService } from '../../domain/contracts/auth/i.auth.service';
import { UserRegistrationData } from '../../domain/values-objects/auth/user-registration-data';
import { ApiAcceptedResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { DomainExceptionFilter } from './exceptions-filter/auth.exceptions.filter';
import { BaseResponseDto } from './dto/responses/baseResponse.dto';
import { LoginUserDto } from './dto/requests/auth/loginUser.dto';
import { LoginResponseDto } from './dto/responses/auth/loginResponse.dto';
import { UserLoginData } from '../../domain/values-objects/auth/user-login-data';

@UseFilters(DomainExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService) private readonly authService: IAuthService,
  ) {}

  @Post('registration')
  @ApiCreatedResponse({ type: BaseResponseDto })
  async registration(@Body() dto: RegisterUserDto): Promise<BaseResponseDto> {
    await this.authService.registerUser(new UserRegistrationData(dto));
    return {
      success: true,
      message: 'User registered successfully',
    };
  }

  @Post('login')
  @ApiAcceptedResponse({ type: LoginResponseDto })
  async login(@Body() dto: LoginUserDto): Promise<LoginResponseDto> {
    const result = await this.authService.loginUser(new UserLoginData(dto));

    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
  }
}
