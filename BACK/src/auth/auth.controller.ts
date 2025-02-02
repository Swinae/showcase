import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { User } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() body: RegisterAuthDto): Promise<User> {
        return this.authService.register(body)
    }

    @Public()
    @Post('signin')
    async signIn(@Body() body: SigninAuthDto) {
        return this.authService.signIn(body)
    }
}

