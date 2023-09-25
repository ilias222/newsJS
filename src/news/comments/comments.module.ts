import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity/comments.entity'; 
import { NewsModule } from '../news.module';
import { UsersModule } from '../../users/users.module';
import { NewsService } from '../news.service';
import { NewsEntity } from '../news.entity/news.entity';
import { AuthService } from 'src/auth/auth.service';
// import { SocketCommentsGateway } from './socket-comments.gateway';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsShema } from './commentsShema/comments.shema';
import { New, NewSchema } from 'src/newsShems/news.shema';

@Module({
controllers: [CommentsController],
providers: [CommentsService, NewsService, AuthService, JwtService], // убрал SocketCommentsGateway
exports: [CommentsService],

imports: [
forwardRef(() => NewsModule),
UsersModule,
TypeOrmModule.forFeature([CommentsEntity]), // Posgres
TypeOrmModule.forFeature([NewsEntity]), // Posgres
MongooseModule.forFeature([{ name: Comments.name, schema: CommentsShema }], 'commentss'), // Монго ДБ
MongooseModule.forFeature([{ name: New.name, schema: NewSchema }], 'news'), // Монго ДБ
],
})
export class CommentsModule {}