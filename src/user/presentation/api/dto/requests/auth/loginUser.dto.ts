import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class LoginUserDto {
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

    @MaxLength(20, {
        message: `Password can't be at most 12 characters`,
    })
    @MinLength(8, {
        message: `Password can't be at least 8 characters`,
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
