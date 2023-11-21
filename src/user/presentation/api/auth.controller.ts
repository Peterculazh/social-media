import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { RegisterUserDto } from './dto/auth/registerUser.dto';
import { IAuthService } from '../../domain/contracts/auth/i.auth.service';
import { UserRegistrationData } from '../../domain/values-objects/auth/user-registration-data';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { DomainExceptionFilter } from './exceptions-filter/auth.exceptions.filter';
import { BaseResponseDto } from './dto/baseResponse.dto';

@UseFilters(DomainExceptionFilter)
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
    ) { }

    @Post('registration')
    @ApiCreatedResponse({ type: BaseResponseDto })
    async registration(@Body() dto: RegisterUserDto): Promise<BaseResponseDto> {
        await this.authService.registerUser(new UserRegistrationData(dto));
        return {
            success: true,
            message: 'User registered successfully',
        }
    }
}
