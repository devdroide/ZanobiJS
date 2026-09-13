import { Injectable } from '@zanobijs/common';

@Injectable()
export class UserRepository {
  findAll(): string[] {
    return ['alice', 'bob'];
  }
}
