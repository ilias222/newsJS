import {
  Controller,
  Body,
  Delete,
  Get,
  Post,
  Param,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Render,
  HttpException,
  HttpStatus
  ,forwardRef,
  Inject,
  Res,
  Req,
  UseGuards
} from '@nestjs/common';
import { News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { FindOneParams } from './create-News.dto';
import { MailService } from 'src/mail/mail.service';
import { NewsEntity } from './news.entity/news.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { CommentsEntity } from './comments/comments.entity/comments.entity';
import { ConfigService } from '@nestjs/config';
import { Request, Response, response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const PATH_NEWS = '/news/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;
// console.log(helperFileLoader)

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
    private mailService: MailService,
    private UsersService: UsersService,
    @Inject(forwardRef(() => CategoriesService))
    private CategoriesService: CategoriesService, 
    private readonly configurateService: ConfigService,
  ) {}

  @Get()
  @Render('news-list')
  @HttpCode(200)
  async getNews(){
    const news = await this.newsService.fullList(); 
    console.log('Mongo in html', news, 'End html', typeof(news))
    return {news}
  }

  @Get('/:author')
  async readUserNews(@Param('author') author){
    // console.log("Promise NEWSBODY", author)
    return await this.newsService.readNews(author);
  }

  @Get('/catalog/:id')
  @Render('news-item')
    async getById(@Param('id') id){
    const inews = await this.newsService.findItems(id);
    // console.log(inews);
    return {inews};
  }

  @UseGuards(AuthGuard)
  @Get('catalog/:id/comment')
  @Render('news-items-of-comment')
  async getByIdNewItemsComment(@Param('id') id){
    // console.log(id);
    const newsItem = await this.newsService.findItems(id);
    // console.log('ID in comments',id);
    const commentsItem = await this.commentService.findAll(id);
    return {newsItem, commentsItem};
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file', { 
    storage: diskStorage({
      destination: 'public/news',
      filename: helperFileLoader.customFileName,
    })}))

  async create(@Body() news: FindOneParams, @UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    let fileName;
    const _user = await this.UsersService.findById(news.authorid);

    if(!_user) {
      throw new HttpException(
        'Не существует такого автора',
        HttpStatus.BAD_REQUEST,
      );
    }
    if(!news.categoryid){
      throw new HttpException(
        'Не существует такой категории',
        HttpStatus.BAD_REQUEST,
      );
    }
    try{
      fileName = '/news/' + file.filename;
    }catch(e) {
      console.log('Не указанна картинка', e)
    }


    await this.newsService.createItemNews(news, _user.id, fileName);
    this.getNews();

    await this.mailService.sendNewNewsForAdmins(
      ['oderilia20@gmail.com'],
      news
    );
    // console.log(_news);

    return response.redirect('http://localhost:3000/news')
  }
  
  @UseGuards(AuthGuard)
  @Post('/read-news')
  @UseInterceptors(FileInterceptor('file', { 
    storage: diskStorage({
      destination: 'public/news',
      filename: helperFileLoader.customFileName,
    })}))
  async readNews(@Body() news, @UploadedFile() file: Express.Multer.File){
    try{
      news.cover = '/news/' + file.filename;
    }catch(e){
      console.log('картинка обнуленна');
    } finally {
      console.log('ЭТО ИДЕТ В СЕРВИС', news)
      return await this.newsService.read(news);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:id/delete')
  async remove(@Param('id') idNews, @Res() respons: Response): Promise<void> {
    await this.newsService.remove(idNews);
    respons.redirect("http://localhost:3000/news")
    return null;
  }
}
