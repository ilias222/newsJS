import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './categories.entity/categories.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { NewsModule } from 'src/news/news.module';
import { NewsService } from 'src/news/news.service';
import { NewsController } from 'src/news/news.controller';
import { Categories, CategoriesShema } from './categoriesShems/categories.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { New, NewSchema } from 'src/newsShems/news.shema';

@Module({
  imports: [
    forwardRef(() => NewsModule), 
    TypeOrmModule.forFeature([CategoriesEntity]),
    MongooseModule.forFeature([{ name: Categories.name, schema: CategoriesShema }], "categoriess"), // Монго ДБ
    MongooseModule.forFeature([{ name: New.name, schema: NewSchema }], "news"),
  ],
  exports: [TypeOrmModule, CategoriesService],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})

export class CategoriesModule {}
