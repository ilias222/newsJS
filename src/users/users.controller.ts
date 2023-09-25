import { Controller, Body, Post, Get, Res, Req, Param, Render, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity/users.entity';
import { UserCreateDto } from './user-create.dto'
import { Role } from 'src/auth/role/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response, response } from 'express';
import { LocalStrategy } from 'src/auth/local.strategy';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';


const PATH_USER = '/users/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_USER;

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService, 
        ) {}
    
    @UseGuards(LocalStrategy)
    @Get('/home')
    @Render('home-page')
    async useHome(@Req() req: Request, @Res() res: Response) {
        if(this.authService.verify(req.cookies.jwt.access_token)){
            const use = await this.usersService.findById(req.cookies.idminis)
            return {use};
        } else{
            return res.render('error') 
        }
    }

    @Get('/users/:id')
    async userId(@Param('id') id) {
        console.log(this.usersService.findById(43))
        return this.usersService.findById(id);
    }

    @UseInterceptors(FileInterceptor('files', { 
        storage: diskStorage({
          destination: 'public/users',
          filename: helperFileLoader.customFileName,
        })}))
    @Post()
    async create(@Body() user, @Res({ passthrough: true }) response: Response, 
    @UploadedFile() files: Express.Multer.File) {
        console.log("FILES_UP",files)
        console.log(user)
        const use = await this.usersService.create(user, files)
            response.cookie('jwt', await this.authService.signIn(user.email, user.password), { httpOnly: true});
            response.cookie('authorize', true);
            response.cookie('idminis', use.id);

            // const cookCover = encodeURIComponent(`${use.cover}`)
            // response.cookie('cover', decodeURIComponent(cookCover));

            const cookEmail = encodeURIComponent(`${use.email}`)
            response.cookie('email', decodeURIComponent(cookEmail));

            const cookName = encodeURIComponent(`${use.firstName} ${use.lastName}`)
            response.cookie(encodeURIComponent('nameuser'), decodeURIComponent(cookName));
        return response.redirect('http://localhost:3000/users/home')
    }

    @Post('/authorise')
    async autchUser(@Body() user, @Res({ passthrough: true }) response: Response){
        const use = await this.usersService.findByEmail(user.email);
        console.log('Object',use)
        if(use){
            response.cookie('jwt', await this.authService.signIn(user.email, user.password), { httpOnly: true});
            response.cookie('authorize', true);
            response.cookie('idminis', use.id);
            // response.cookie('cover', use.cover);

            const cookEmail = encodeURIComponent(`${use.email}`)
            response.cookie('email', decodeURIComponent(cookEmail));

            const cookName = encodeURIComponent(`${use.firstName} ${use.lastName}`)
            response.cookie(encodeURIComponent('nameuser'), decodeURIComponent(cookName));
        }
        return response.redirect('http://localhost:3000/users/home')
    }
}
