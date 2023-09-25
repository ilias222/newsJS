import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from './mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test', {
      connectionName: 'news',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test', {
      connectionName: 'users',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test', {
      connectionName: 'commentss',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test', {
      connectionName: 'categoriess',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.secret-key', '.env.typeORM']
    }),
    CacheModule.register(),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_CONNECTION,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [process.env.TYPEORM_ENTITIES],
      autoLoadEntities: true,
      synchronize: true,
    }),
    NewsModule,
    MailModule,
    UsersModule,
    CategoriesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    
  ],

})
export class AppModule {
}
