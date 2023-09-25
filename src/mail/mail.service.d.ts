import { MailerService } from '@nestjs-modules/mailer/dist';
import { News } from 'src/news/news.service';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendNewNewsForAdmins(emails: string[], news: News): Promise<void>;
    readNews(emails: string[], newsItem: News, newsRead: News): Promise<void>;
}
