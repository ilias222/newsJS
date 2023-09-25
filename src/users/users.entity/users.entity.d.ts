import { NewsEntity } from '../../news/news.entity/news.entity';
import { CommentsEntity } from '../../news/comments/comments.entity/comments.entity';
import { Role } from '../../auth/role/role.enum';
export declare class UsersEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role;
    news: NewsEntity[];
    comments: CommentsEntity[];
    createdAt: Date;
    updatedAt: Date;
}
