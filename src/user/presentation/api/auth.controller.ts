import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { RegisterUserDto } from './dto/requests/auth/registerUser.dto';
import { IAuthService } from '../../domain/contracts/auth/i.auth.service';
import { UserRegistrationData } from '../../domain/values-objects/auth/user-registration-data';
import {
    ApiAcceptedResponse,
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiTags,
} from '@nestjs/swagger';
import { DomainExceptionFilter } from './exceptions-filter/auth.exceptions.filter';
import { BaseResponseDto } from './dto/responses/baseResponse.dto';
import { LoginUserDto } from './dto/requests/auth/loginUser.dto';
import { LoginResponseDto } from './dto/responses/auth/loginResponse.dto';
import { UserLoginData } from '../../domain/values-objects/auth/user-login-data';
import { LogoutUserDto } from './dto/requests/auth/logoutUser.dto';
import {
    BadRequestDto,
    ConflictDto,
} from '../../../common/presentation/api/dto';

@ApiTags(`Auth`)
@UseFilters(DomainExceptionFilter)
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
    ) {}

    @Post('registration')
    @ApiCreatedResponse({ type: BaseResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    @ApiConflictResponse({ type: ConflictDto })
    async registration(@Body() dto: RegisterUserDto): Promise<BaseResponseDto> {
        await this.authService.registerUser(new UserRegistrationData(dto));
        return {
            success: true,
            message: 'User registered successfully',
        };
    }

    @Post('login')
    @ApiAcceptedResponse({ type: LoginResponseDto })
    @ApiBadRequestResponse({ type: BadRequestDto })
    async login(@Body() dto: LoginUserDto): Promise<LoginResponseDto> {
        const result = await this.authService.loginUser(new UserLoginData(dto));

        return {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        };
    }

    @Post('logout')
    @ApiAcceptedResponse({ type: BaseResponseDto })
    async logout(@Body() dto: LogoutUserDto): Promise<BaseResponseDto> {
        await this.authService.logoutUser(dto.refreshToken);
        return {
            success: true,
            message: 'User logged out successfully',
        };
    }
}
