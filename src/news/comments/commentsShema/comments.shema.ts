import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;

@Schema()
export class Comments {
  @Prop()
  id: string;

  @Prop()
  nameuser: string;

  @Prop()
  message: string;

  @Prop()
  email: string;

  @Prop()
  newsId: number;

  @Prop()
  cover: string;

  @Prop()
  createAt: Date;

  @Prop()
  userId: number;

}

export const CommentsShema = SchemaFactory.createForClass(Comments);