import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { UsersEntity } from "src/users/users.entity/users.entity";
import { NewsEntity } from "src/news/news.entity/news.entity";

@Entity('comments')
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nameuser: string;

    @Column('text')
    message: string;

    @Column('text')
    email: string;

    @Column('text')
    idnews: number;
    
    @Column('text', {nullable: true})
    cover: string;

    @ManyToOne(() => UsersEntity, (user) => user.comments)
    user: UsersEntity;

    @ManyToOne(() => UsersEntity, (news) => news.comments)
    news: NewsEntity;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

}
