import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        try {
            const existingUser = await this.usersService.findByEmail(body.email)

            // If user's mail already exist in DB, throw a CONFLICT exception
            if (existingUser) {
                throw new HttpException('Email already exist', HttpStatus.CONFLICT)
            }

            //Else, hash user's password
            const hashedPassword = await this.authService.hashPassword(body.password)

            // Créer un nouvel objet basé sur le corps original, en remplaçant le mot de passe
            const userToCreate = { ...body, password: hashedPassword }

            // On créé le user
            const newUser = await this.usersService.create(userToCreate)

        } catch (error) {
            console.error(error)
        }
    }
}

