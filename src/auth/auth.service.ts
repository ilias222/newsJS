import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compare } from '../utils/crypto';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {
constructor(
private readonly usersService: UsersService,
private readonly jwtService: JwtService,
) {}

async validateUser(email: string, pass: string): Promise<any> {
const user = await this.usersService.findByEmail(email);
if (user && (await compare(pass, user.password))) {
return user;
}
return null;
}

async signIn(email, pass): Promise<object> {
    const user = await this.usersService.findByEmail(email);
    console.log(await compare(pass, user.password))
    if (! await compare(pass, user.password)) {
      console.log('UPS');
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, jwtConstants),
    };
  }

async verify(token: string) {
return this.jwtService.verify(token, jwtConstants);
}
}