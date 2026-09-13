import { Controller } from '@zanobijs/common';
import { UserRepository } from './user.repository';

/**
 * A propósito SIN @Inject — dependencia clase-a-clase implícita, la ruta
 * de resolución afectada por SEC-02 (nombre de clase/parámetro mutados
 * bajo minificación). Ver .wiki/modules/decorators.md.
 */
@Controller()
export class UserController {
  constructor(private userRepository: UserRepository) {}

  list(): string[] {
    return this.userRepository.findAll();
  }
}
