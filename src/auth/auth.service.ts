import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

// eslint-disable-next-line
const users = require('../users.json');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  signinLocal(dto: AuthDto) {
    // retrieve user
    const user = users.find((_user) => _user.email === dto.email);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Invalid Credentials');

    return this.signUser(user.id, user.email, 'user');
  }

  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type: type,
    });
  }
}
