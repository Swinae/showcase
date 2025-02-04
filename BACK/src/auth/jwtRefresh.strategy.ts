import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly user:UsersService, private readonly authService:AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            secretOrKey: process.env.REFRESH_TOKEN,
            passReqToCallback: true,
        });
    }

    async validate(req: any, payload: any) {
        const refreshToken = req.body.refreshToken;
        const user = await this.user.findById(payload.sub);
        const isMatchingToken = await this.authService.compareRefreshToken(refreshToken, user.refreshToken)

        if (!user || !isMatchingToken) {
            throw new UnauthorizedException('You must login to continue');
        }

        return user;
    }
}
