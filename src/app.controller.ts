import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalStrategy } from './auth/local.strategy'; 
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
constructor(
    private readonly authService: AuthService,
    ) {}
}
