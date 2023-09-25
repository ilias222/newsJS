import { UsersEntity } from "src/users/users.entity/users.entity";
import { NewsEntity } from "src/news/news.entity/news.entity";
export declare class CommentsEntity {
    id: number;
    message: string;
    user: UsersEntity;
    news: NewsEntity;
    createdAt: Date;
    updatedAt: Date;
}
