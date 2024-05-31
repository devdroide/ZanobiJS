/**
 * Interfaz que representa la configuración para un módulo.
 *
 * - `imports`: Módulos que este módulo necesita importar.
 * - `controllers`: Controladores que se deben registrar en este módulo.
 * - `services`: Servicios o proveedores que deben ser instanciados y estar disponibles dentro de este módulo.
 * - `exports`: Miembros que deben ser exportados y disponibles para otros módulos que importen este módulo.
 */
export interface IModuleConfig {
  imports?: any[];
  controllers?: any[];
  services?: any[];
  exports?: any[];
}
