import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/models/user.model';
import { UsersService } from '../users/users.service';

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private users: UsersService;
  constructor(users: UsersService) {
    super({
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      signOptions: {
        expiresIn: '5m',
      },
    });
    this.users = users;
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    const { sub: id } = payload;
    const user = await this.users.findForId(id);

    if (!user) {
      return null;
    }

    return user;
  }
}
