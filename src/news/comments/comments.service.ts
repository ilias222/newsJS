import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity/comments.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from './commentsShema/comments.shema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name, 'commentss') 
    private сommentModel: Model<Comments>, // Регистрация модели новости
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,

    private readonly eventEmitter: EventEmitter2,
    ) {}

    async create(formDatas, fileAvatar: string) {

      if (!parseInt(formDatas.idNews) || !parseInt(formDatas.idUser)) {
        console.log(parseInt(formDatas.idNews), parseInt(formDatas.idUser), typeof(parseInt(formDatas.idNews)), typeof(parseInt(formDatas.idUser)))
        throw new HttpException(
        'Не существует такой новости',
        HttpStatus.BAD_REQUEST,
        );
      }

      let commentCover

      if(fileAvatar){
        commentCover = '/comments/' + fileAvatar;
      } else {
        commentCover = '/comments/' + '0db8db6d-6347-4622-882e-68f6315528e2.png';
      }

      const commentNew = new this.сommentModel({ 
        id: formDatas.id,
        nameuser: formDatas.nameuser,
        message: formDatas.message,
        email: formDatas.email,
        newsId: parseInt(formDatas.idNews),
        cover: commentCover,
        createAt: formDatas.createAt,
        userId: formDatas.idUser
       });
       commentNew.save();

       console.log('Монго модель : ', await this.сommentModel.find().exec(), 'Конец монго модели'); // MongoDB

     return await this.сommentModel.find({ newsId: parseInt(formDatas.idNews) }).lean()
}

  async redact(comItem){
    await this.сommentModel.updateOne( 
      {
        id: comItem.id}, 
      { 
        $set: {message: comItem.message} 
      } 
      )
  }

    async findAll(idNews): Promise<CommentsEntity[]|undefined> {
      return await this.сommentModel.find(({ newsId: idNews })).lean();
    }

async findById(id):Promise<CommentsEntity|undefined> {
return await this.commentsRepository.findOne({relations: ['news'] });
}
async remove(id: string): Promise<void> {
console.log('HELLO IS DELETE', id);
await this.сommentModel.deleteOne({ id: id });
console.log('DELETE OK', id)
}

}
