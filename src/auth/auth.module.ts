import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { RolesGuard } from './role/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity/users.entity';
import { AuthController } from './auth.controller';
@Module({
imports: [
TypeOrmModule.forFeature([UsersEntity]),
PassportModule,
JwtModule.register({
secret: jwtConstants.secret,
signOptions: { expiresIn: '60s' },
}),
],
providers: [
  AuthService, 
  LocalStrategy,
  UsersService,
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
    },
    
],
exports: [AuthService],
controllers: [AuthController],
})
export class AuthModule {}
