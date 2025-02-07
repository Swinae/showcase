import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    async register(body: RegisterAuthDto) {
        try {
            const user = await this.usersService.findByEmail(body.email)

            if (user) {
                throw new HttpException('Email already exist', HttpStatus.CONFLICT)
            }

            const hashedPassword = await this.hashData(body.password)
            const userToCreate = { ...body, password: hashedPassword }

            return await this.usersService.create(userToCreate)

        } catch (error) {
            console.error(error)
        }
    }

    async genAuthTokens(user: User) {
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
            return {
                accessToken,
                refreshToken
            }

        } catch (error) {
            throw (error)
        }
    }

    async genAccessToken(user: User): Promise<string> {
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

        return accessToken
    }

    async setAuthCookies(accessToken: string, refreshToken: string, res: Response) {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
            sameSite: 'strict',  // Protects against CSRF
            maxAge: 15 * 60 * 1000,  // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        });
    }

    async setAccessCookie(accessToken: string, res: Response) {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, 
        });
    }

    async signIn(user: User, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken)
        return await this.usersService.update(user.id, {refreshToken: hashedRefreshToken})
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);

        if (!user) {
            throw new HttpException('Incorrect email or password', HttpStatus.FORBIDDEN)
        }

        const isMatchingPwd = await this.compareData(pass, user.password);

        if (!isMatchingPwd) {
            throw new HttpException('Incorrect email or password', HttpStatus.FORBIDDEN)
        }

        const { password, ...result } = user;
        return result;
    }

    async hashData(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    async compareData(formPwd: string, dbHashedPwd: string): Promise<Boolean> {
        return await bcrypt.compare(formPwd, dbHashedPwd)
    }

    async compareRefreshToken(reqToken: string, userToken: string): Promise<Boolean> {
        return await bcrypt.compare(reqToken, userToken)
    }
}
