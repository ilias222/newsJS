import { Test } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { News, NewsService } from './news.service';
import { NewsEntity } from './news.entity/news.entity';
import { Role } from 'src/auth/role/role.enum';

describe('NewsModule', () => {
    let newsController: NewsController;
    let newsService: NewsService;
  
    beforeEach(async () => {
      const newsModule = await Test.createTestingModule({
          controllers: [NewsController],
          providers: [NewsService],
        }).compile();
  
      newsService = newsModule.get<NewsService>(NewsService);
      newsController = newsModule.get<NewsController>(NewsController);
    });

    describe('findAll', () => {
        it('should return an object News and Categoty, and User, in ID', async () => {
          const result: Promise<NewsEntity> = new Promise((res, rej) => res({
            'id': 1,
            'title': 'history',
            'descript': 'history descript',
            'createdAt': new Date(),
            'cover': '',
            'category': {'id': 1, 'name': 'name', 'news': []},
            'updatedAt': new Date(),
            'user': {
                'comments': [],
                'createdAt': new Date, 
                'email': '', 
                'firstName': '', 
                'id': 1, 
                'lastName': '', 
                'news': [], 
                'password': '', 
                'roles': Role['user'], 
                'updatedAt': new Date()},
        }));
          jest.spyOn(newsService, 'findItems').mockImplementation(() => result);
    
          expect(await newsController.getById(1)).toBe(result);
        });

        it('should return an object all News', async () => {
            const result: Promise<NewsEntity[]> = new Promise((res, rej) => res(
                [
                    {
              'id': 1,
              'title': 'history',
              'descript': 'history descript',
              'createdAt': new Date(),
              'cover': '',
              'category': {'id': 1, 'name': 'name', 'news': []},
              'updatedAt': new Date(),
              'user': {
                  'comments': [],
                  'createdAt': new Date, 
                  'email': '', 
                  'firstName': '', 
                  'id': 1, 
                  'lastName': '', 
                  'news': [], 
                  'password': '', 
                  'roles': Role['user'], 
                  'updatedAt': new Date()},
          }
        ]
          ));
            jest.spyOn(newsService, 'fullList').mockImplementation(() => result);
      
            expect(await newsController.getNews()).toBe(result);
          });

          it('should create new News', async () => {
            const result: Promise<News> = new Promise((res, rej) => res(
                    {
              'id': 1,
              'title': 'history',
              'descript': 'history descript',
              'author': '',
              'dataMess': new Date(),
              'imgTitle': './cover.gif',
              'text':'Home all'
          }
          ));
            jest.spyOn(newsService, 'createItemNews').mockImplementation(() => result);
      
            expect(await newsController.create(
                {
                'author':'', 
                'authorid': 1, 
                'categoryid': 1, 
                'dataMess': new Date(), 
                'descript':'history descript', 
                'id': 1, 
                'imgTitle': {}, 
                'text': 'Home all', 
                'title': 'history',
            }, 
                File['fileName']
                ))
                .toBe(result);
          });

          // Далее еще не подключенны к БД
      });
    });