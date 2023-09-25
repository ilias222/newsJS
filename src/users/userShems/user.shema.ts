import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Жопный импорт!
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/auth/role/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: Role;

  @Prop()
  cover: string;

  @Prop()
  createAt: Date;

}

export const UsersShema = SchemaFactory.createForClass(User);