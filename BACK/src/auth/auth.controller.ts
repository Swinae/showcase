import { Body, Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

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
    async signIn(@Request() req, @Res() res: Response): Promise<any> {
        try {
            console.log(req.user);
            
            const { access_token, refresh_token } = await this.authService.signIn(req.user)

            res.cookie('accessToken', access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
                sameSite: 'strict',  // Protects against CSRF
                maxAge: 15 * 60 * 1000,  // 15 minutes
            });

            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
            });

            return res.status(200).json({ message: 'Logged in successfully' });

        } catch (error) {
            console.error('SignIn Error:', error);  // Log the error to the console
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }



    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refresh(@Request() req) {
        const user = req.user;  // The validated user from the refresh token
        return this.authService.signIn(user);  // Issue new access and refresh tokens
    }
}

