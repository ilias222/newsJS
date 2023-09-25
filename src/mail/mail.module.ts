import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  exports: [MailService],
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://ilya_222:PASWORD@smtp.mail.ru',
      defaults: {
        from: '"NestJS робот" <ilya_222@internet.ru>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController]
})
export class MailModule {}
