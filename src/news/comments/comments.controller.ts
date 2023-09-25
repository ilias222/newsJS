import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { CommentsService } from './comments.service';
import { CommentCreadeDTO } from './create-Comment.dto';
import { CommentsEntity } from './comments.entity/comments.entity';

const PATH_COMMENTS = '/comments/';
const commentsFileLoader = new HelperFileLoader();
commentsFileLoader.path = PATH_COMMENTS;

@Controller('news-comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/all')
  getAll(@Query('idNews') idNews){
    return this.commentsService.findAll(idNews);
  }

  @Post('/redact')
  // костыль, пересмотреть тип реквеста
  // форм дата не нужна
  // Тип получаемого тела - JSON
  ///////////////////////////////////////////
  @UseInterceptors(FileInterceptor('comments', { 
    storage: diskStorage({
      destination: 'public/comments',
      filename: commentsFileLoader.customFileName,
    })}))
    /////////////////////////////////////////
  read(@Body() redac) {
    console.log('READ', redac)
    return this.commentsService.redact(redac)
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('comments', { 
    storage: diskStorage({
      destination: 'public/comments',
      filename: commentsFileLoader.customFileName,
    })}))
  create(@Body() comment,  @UploadedFile() comments: Express.Multer.File) {
    console.log('CREATE COMMENT', comment)
    let comm;
    try{
      comm = comments.filename;
    } catch (e){
      comm = null;
    }
    return this.commentsService.create(comment, comm);
  }

  @Delete(':id')
  async remove(@Param('id') idComment) {
    console.log('DELETE COMMENT', idComment);
    await this.commentsService.remove(idComment);
  }
}
