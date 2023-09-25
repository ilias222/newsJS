import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity/users.entity';
import { RolesGuard } from '../auth/role/roles.guard';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User, UsersShema } from './userShems/user.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { New, NewSchema } from 'src/newsShems/news.shema';
@Module({
providers: [
UsersService,
AuthService,
JwtService,
{
    provide: APP_GUARD,
    useClass: RolesGuard,
    },
],
controllers: [UsersController],
imports: [
TypeOrmModule.forFeature([UsersEntity]),
forwardRef(() => AuthModule),
MongooseModule.forFeature([{ name: User.name, schema: UsersShema }], 'users'), // Монго ДБ
MongooseModule.forFeature([{ name: New.name, schema: NewSchema }], 'news'), // Монго ДБ
],
exports: [UsersService],
})
export class UsersModule {}
