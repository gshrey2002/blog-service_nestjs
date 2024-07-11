import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import axios from 'axios';
import { GetToken } from './decorators/get-token.decorator';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    // console.log('Token:', token);
    // console.log('Payload:', payload);

    try {
      const response = await axios.post(
        `${process.env.authBaseUrl}/auth/validate`,
        { token },
      );
      //   console.log(response);

      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
