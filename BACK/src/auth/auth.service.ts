import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { RegisterAuthDto } from './dto/register-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
    ) { }

    async register(body: RegisterAuthDto) {
        try {
            const user = await this.usersService.findByEmail(body.email)

            if (user) {
                throw new HttpException('Email already exist', HttpStatus.CONFLICT)
            }

            const hashedPassword = await this.hashPwd(body.password)
            const userToCreate = { ...body, password: hashedPassword }

            return await this.usersService.create(userToCreate)

        } catch (error) {
            console.error(error)
        }
    }

    async singIn(body: SigninAuthDto) {
        try {

            //Those steps can be grouped inside a specific function validateUser
            const user = await this.usersService.findByEmail(body.email)
            const isMatchingPwd = await this.comparePwd(body.password, user.password)

            if (!user || !isMatchingPwd) {
                throw new HttpException('Incorrect email or password', HttpStatus.FORBIDDEN)
            }




        } catch (error) {
            throw (error)
        }
    }

    async hashPwd(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    async comparePwd(formPwd: string, dbHashedPwd: string): Promise<Boolean> {
        return await bcrypt.compare(formPwd, dbHashedPwd)
    }
}
