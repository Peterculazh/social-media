import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterUserDto {
    @IsEmail(
        {
            allow_display_name: false,
        },
        {
            message: 'Email must be a valid email address',
        },
    )
    @IsString({
        message: 'Email must be a string',
    })
    @IsNotEmpty({
        message: 'Email is required',
    })
    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'The email of the user',
    })
    email: string;

    @MaxLength(12, {
        message: 'Nickname must be at most 12 characters',
    })
    @MinLength(4, {
        message: 'Nickname must be at least 4 characters',
    })
    @IsString({
        message: 'Nickname must be a string',
    })
    @IsNotEmpty({
        message: 'Nickname is required',
    })
    @ApiProperty({
        example: 'John_doe',
        description: 'The nickname of the user',
    })
    nickname: string;

    @MaxLength(20, {
        message: 'Password must be at most 12 characters',
    })
    @MinLength(8, {
        message: 'Password must be at least 8 characters',
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @IsString({
        message: 'Password must be a string',
    })
    @IsNotEmpty({
        message: 'Password is required',
    })
    @ApiProperty({ example: 'joHnD0#', description: `User's password` })
    password: string;
}
