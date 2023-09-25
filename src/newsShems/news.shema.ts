import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/userShems/user.shema';
import { Categories } from 'src/categories/categoriesShems/categories.shema';
// Жопный импорт!
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type NewDocument = HydratedDocument<New>;

@Schema()
export class New {
  @Prop()
  idNew: number;

  @Prop()
  idUser: number;

  @Prop()
  title: string;

  @Prop()
  descript: string;

  @Prop()
  author: string;

  @Prop()
  cover: string;

  @Prop()
  dadtaMess: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: Categories;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const NewSchema = SchemaFactory.createForClass(New);