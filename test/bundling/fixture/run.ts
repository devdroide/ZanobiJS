import 'reflect-metadata';
import { Factory } from '@zanobijs/core';
import { AppModule } from './app.module';
import { UserController } from './user.controller';

const factory = new Factory(AppModule, { activeLoggerSystem: false });
const app = factory.create();
const controller = app.get<UserController>('UserController');
console.log(JSON.stringify(controller.list()));
