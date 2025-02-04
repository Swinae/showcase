import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { User } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Public()
    @Post('register')
    async register(@Body() body: RegisterAuthDto): Promise<User> {
        return this.authService.register(body)
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req): Promise<{user: User, access_token: string, refresh_token: string}> {
        return this.authService.signIn(req.user);
    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refresh(@Request() req) {
        const user = req.user;  // The validated user from the refresh token
        return this.authService.signIn(user);  // Issue new access and refresh tokens
    }
}

