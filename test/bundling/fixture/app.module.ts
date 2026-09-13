import { Module } from '@zanobijs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  services: [UserRepository],
  exports: [],
})
export class AppModule {}
