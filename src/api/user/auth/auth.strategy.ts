import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthHelper } from './auth.helper';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly helper: AuthHelper,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_KEY'),
    });
  }

  async validate(payload: { id: number; email: string }): Promise<User> {
    console.log('Validating in JwtStrategy:', payload);
    
    const user = await this.helper.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // Retorne o objeto 'user' em vez de 'true'
  }
}
