import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { News } from 'src/news/news.service';

@Injectable()
export class MailService {
   constructor(private readonly mailerService: MailerService){}

   async sendNewNewsForAdmins (emails: string[], news: News): Promise<void>{
    console.log('Отправляем письмо о новой новости');

    for (const email of emails){
        await this.mailerService
        .sendMail({
            to: email,
            subject: `Созданна новая новость: ${news.title}`,
            template: './new-nwes.hbs',
            context: news,
        })
        .then((res) => {
            console.log('res', res);
        })
        .catch((err) => {
            console.log('err', err);
        });
    }
   }

   async readNews(emails: string[], newsItem: News, newsRead: News): Promise<void>{
    for (const email of emails){
        await this.mailerService
        .sendMail({
            to: email,
            subject: `Скорректирована новость: ${newsItem.title}`,
            template: './news-read',
            context: [newsItem, newsRead],
        })
        .then((res) => {
            console.log('res', res);
        })
        .catch((err) => {
            console.log('err', err);
        });
    }
   }
}
