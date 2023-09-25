import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { NewsEntity } from './news.entity/news.entity';
import { InjectModel } from '@nestjs/mongoose';
import { New } from 'src/newsShems/news.shema';
import { Model } from 'mongoose';

export interface News {
  id: number;
  title: string;
  descript: string;
  author: string;
  dataMess: Date;
  imgTitle?: string | object;
  text?: string;
}

type Files = {
  filename: string
}

const PATH_NEWS = '/news/';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(New.name, 'news') 
    private newModel: Model<New>, // Регистрация модели новости
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
    
  ) {}
  
  async readNews(body){
    return this.newModel.find({ author: body }).lean()
  }

  async fullList() {
    // await this.newModel.deleteMany( { author: "Илья Одер" } ) // Удаляет!!!
    console.log('Монго модель : ', await this.newModel.find().exec(), 'Конец монго модели'); // MongoDB
    return await this.newModel.find().lean(); // MongoDB
  }

  async createItemNews(News: News, userid, file:string): Promise<News>{
    
    const newMongo = new this.newModel({ 
      idNew: News.id,
      idUser: userid,
      title: News.title, 
      descript: News.descript, 
      author: News.author, 
      cover: file, 
      dadtaMess: News.dataMess 
    })
    newMongo.save();
    return await this.newModel.find().lean()
  }

  async findItems(id: number): Promise<NewsEntity | null> {
    return await this.newModel.findOne({ idNew: id }).lean();
    }

  async findAllItems(id: number): Promise<NewsEntity | null>{
    return await this.newsRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
      order: {
        user:{
          createdAt:'DESC',
        },
        },
      })
  }

  async read(newsItem){
    await this.newModel.updateOne( 
      {idNew: newsItem.id}, 
      { 
        $set: {cover: newsItem.cover, title: newsItem.title, descript: newsItem.describ} 
      } 
      )
  }

  async remove(idNews: number) {
    await this.newModel.deleteMany( { idNew: idNews } );
    return true;
  }
}