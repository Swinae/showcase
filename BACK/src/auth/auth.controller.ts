import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService, 
        private readonly usersService: UsersService
    ) { }

    @Post('register')
    async register(@Body() body: RegisterAuthDto): Promise<User> {
        return this.authService.register(body)
    }

    @Post('signin')
    async signIn(@Body() body: SigninAuthDto) {
        return this.authService.singIn(body)
    }
}

