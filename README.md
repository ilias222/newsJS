<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## О проекте
Пробный проект на nest js.
При работе с проектом, были использованны:

1. express - для создания сервера. В итоге сделан статический сервер;

2. Posgresql, под управением typeORM;

3. Шаблонизатор hbs;

4. DTO схемы новостей, комментариев, пользователей;

5. JWT tokens, для идентификации пользователя при использовании сервиса;




## На данный момент реализованны кмпоненты:
1. Методы создания, редактирования новостей;

2. Метод создаия комментариев;

3. Методы идетификации и авторизации. Так же регистрации;

4. Добавленна, но не реализованна ролевая система распределения доступа и прав к сервису;

5. Методы создания, редактирования новостей;

## backend
NestJS + express

## frontend
На данный момент:

1. Шаблоны hbs;

2. JavaScript, предпологается переход на React + Webpack, после React + TypeScript + Webpack;

3. Стили на данный момент CSS, предпологается переход на SASS + Webpack;

## Исходные данные

[Скачать](git@github.com:ilias222/nestjs-test-news.git) repository.

## Установка

```bash
$ npm install
```

## Режимы запуска

```bash
# Разработка
$ npm run start

# Наблюдение за изменениями
$ npm run start:dev

# Конечная сборка
$ npm run start:prod
```

## Тесты

```bash
# unit тесты (jest)
$ npm run test

# e2e тесты
$ npm run test:e2e

# проверить покрытие теста
$ npm run test:cov
```

