import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { CategoriesEntity } from "src/categories/categories.entity/categories.entity";
import { UsersEntity } from "src/users/users.entity/users.entity";

@Entity('news')
export class NewsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    descript: string;

    @Column('text')
    author: string;

    @Column('text', {nullable: true})
    cover: string;

    @ManyToOne(() => CategoriesEntity, (category) => category.news)
    category: CategoriesEntity;

    @ManyToOne(() => UsersEntity, (user) => user.news)
    user: UsersEntity;

    @CreateDateColumn({type: 'timestamp'})
    dataMess: Date;
}
