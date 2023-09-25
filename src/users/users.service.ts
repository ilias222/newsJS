import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity/users.entity';
import { Role } from '../auth/role/role.enum';
import { UserCreateDto } from './user-create.dto';
import { hash } from '../utils/crypto';


let use;
export type User = any;
@Injectable()
export class UsersService {
constructor(
@InjectRepository(UsersEntity)
private readonly usersRepository: Repository<UsersEntity>,
) {}

// Возвращаемое значение может быть Promise<UsersEntity|undefined>
// Озвучить устно, что надо отработать крайний случай на уровне выше, если запись не произошла

async create(user: UserCreateDto, files: Express.Multer.File) {
const userEntity = new UsersEntity();
userEntity.firstName = user.firstName;
userEntity.lastName = user.lastName;
userEntity.email = user.email;
userEntity.roles = user.roles;

if(files){
    userEntity.cover = '/users/' + files.filename;
} else{
    userEntity.cover = '/users/30fd7379-5bbb-45b9-8532-acc7caf0804c.jpg'
}
console.log('ГДЕ ЖЕ ТЫ!')

// хэшируем пароль
userEntity.password = await hash(user.password);

console.log('Хеш пароля прошел?')
// записываем юзера в базу
await this.usersRepository.save(userEntity);

console.log('Запись в базу')
use = await this.findByEmail(userEntity.email);

console.log('Присваеваем юзера', use)

return use
}


async findById(id): Promise<UsersEntity> {
return this.usersRepository.findOneBy({ id });
}


async findByEmail(email): Promise<UsersEntity> {
return this.usersRepository.findOneBy({ email });
}


async setModerator(idUser): Promise<UsersEntity> {
const _user = await this.findById(idUser);
if (!_user) {
throw new UnauthorizedException();
}
_user.roles = Role.Moderator;
return this.usersRepository.save(_user);
}
}
