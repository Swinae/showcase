import { Body, Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req, Response } from 'express';

export interface RequestWithUser extends Req {
    user: User;
}

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
    async signIn(@Request() req: RequestWithUser, @Res() res: Response): Promise<any> {
        try {
            const { accessToken, refreshToken } = await this.authService.genAuthTokens(req.user)
            await this.authService.setAuthCookies(accessToken, refreshToken, res)
            await this.authService.signIn(req.user, refreshToken)

            return res.status(200).json({ message: 'Logged in successfully' });

        } catch (error) {
            console.error('SignIn Error:', error);  // Log the error to the console
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refresh(@Request() req: RequestWithUser, @Res() res: Response) {
        const user = req.user;  // The validated user from the refresh token
        const accessToken = await this.authService.genAccessToken(user)
        return this.authService.setAccessCookie(accessToken, res);  // Issue new access and refresh tokens
    }
}

