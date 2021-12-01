import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import users from '../users/users';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signinLocal(@Body() dto: AuthDto) {
    // * retrieve user
    const user = users.find(
      (_user) => _user.email === dto.email && _user.username === dto.username,
    );
    if (!user) throw new UnauthorizedException('Invalid User Credentials');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Invalid Pass Credentials');

    return this.signUser(user.id, user.email, user.username, 'user');
  }

  signUser(userId: number, username: string, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      username,
      email,
      type,
    });
  }
}
