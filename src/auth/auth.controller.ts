import { Body, Controller, Get, Render, Redirect, Post, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get()
    @Render('auth-page')
    getAuth(){
    }

    @Post('/singOut')
    @Redirect('http://localhost:3000/auth/singUp', 302)
    async signIn(@Body() body){
        console.log('auth', body.username, body.password)
        return await this.authService.validateUser(body.username, body.password)
    }

    async signUp(user): Promise<object>{
        return await this.authService.signIn(user.email, user.password)
    }
}
