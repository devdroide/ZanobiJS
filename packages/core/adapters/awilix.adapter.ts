import { createContainer, InjectionMode, AwilixContainer } from 'awilix';
import { IContainerAdapter } from '../interfaces/container.interface';
import {
  ContainerResolutionEntityException,
  ContainerResolutionException,
} from '../exceptions/resolution.exception';

export class AwilixAdapter implements IContainerAdapter {
  private container: AwilixContainer;

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC, // Mantenemos CLASSIC por compatibilidad con constructores
    });
  }

  /**
   * Registra todas las clases y proveedores en el contenedor de Awilix.
   */
  register(classes: any): void {
    this.container.register(classes);
  }

  /**
   * Resuelve una instancia.
   */
  resolve<T>(className: string): T {
    try {
      return this.container.resolve<T>(className);
    } catch (error) {
      this.handleResolutionError(className, error);
    }
  }

  private handleResolutionError(className: string, error: any): never {
    const message = error.message || '';
    const resolutionError = message.split('\n');
    const classNameMatch = message.match(/'([^']+)'/);
    const foundName = classNameMatch ? classNameMatch[1] : null;

    if (foundName === className) {
      throw new ContainerResolutionEntityException(className, message);
    }

    throw new ContainerResolutionException(
      className,
      resolutionError[0],
      message,
    );
  }

  async dispose(): Promise<void> {
    await this.container.dispose();
  }
}
