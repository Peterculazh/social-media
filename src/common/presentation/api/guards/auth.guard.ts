import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IUserToken } from '../../../token';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }
        try {
            const payload: IUserToken = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET,
                },
            );
            request['user'] = payload;
        } catch (e) {
            console.log(e);
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
