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

    async signIn(user: any) {
        try {

            const payload =
            {
                sub: user.id,
                username: user.email,
                role: user.role
            };

            const accessToken = await this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN,
                expiresIn: '15m',
            })

            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: process.env.REFRESH_TOKEN,
                expiresIn: '7d'
            })

            const updatedUser = this.usersService.update(user.id, {refreshToken})

            return { updatedUser, accessToken, refreshToken }


        } catch (error) {
            throw (error)
        }
    }

    

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);

        if (!user) {
            throw new HttpException('Incorrect email or password', HttpStatus.FORBIDDEN)
        }

        const isMatchingPwd = await this.comparePwd(pass, user.password);

        if (!isMatchingPwd) {
            throw new HttpException('Incorrect email or password', HttpStatus.FORBIDDEN)
        }

        const { password, ...result } = user;
        return result;
    }

    async hashPwd(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    async comparePwd(formPwd: string, dbHashedPwd: string): Promise<Boolean> {
        return await bcrypt.compare(formPwd, dbHashedPwd)
    }

    async compareRefreshToken(reqToken: string, userToken: string): Promise<Boolean> {
        return await bcrypt.compare(reqToken, userToken)
    }
}
