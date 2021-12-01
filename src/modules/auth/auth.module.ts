import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/strategy/jwt.stategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { RefreshToken } from 'src/models/refresh-token.model';
import { TokensService } from './tokens.service';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    SequelizeModule.forFeature([RefreshToken]),
    JwtModule.register({
      secret: 'secretkey',
      signOptions: {
        expiresIn: '5m',
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [TokensService, RefreshTokensRepository],
})
export class AuthModule {}
