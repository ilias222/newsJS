"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs-modules/mailer/dist");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendNewNewsForAdmins(emails, news) {
        console.log('Отправляем письмо о новой новости');
        for (const email of emails) {
            await this.mailerService
                .sendMail({
                to: email,
                subject: `Созданна новая новость: ${news.title}`,
                template: './new-news',
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
    async readNews(emails, newsItem, newsRead) {
        for (const email of emails) {
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
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map