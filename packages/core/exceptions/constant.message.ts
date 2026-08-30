export const MODULE_INVALID_ANNOTATION_ERROR = () =>
  'The class must have an annotation @Module()';
export const CONTAINER_RESOLUTION_ERROR = (
  entity: string,
  resolutionError: string,
) => `${resolutionError} please review '${entity}' and its dependencies.`;
export const CONTAINER_RESOLUTION_ENTITY_ERROR = (entity: string) =>
  `Please check that the entity '${entity}' exists and is registered in @modulo`;
export const PROVIDER_INVALID_MODULE_ERROR = (
  entity: string,
  moduleName: string,
) =>
  `Please check that ${entity} located in the @module ${moduleName} exists and is @Injectable().`;
export const MISSING_INJECT_TOKEN_ERROR = (
  token: string,
  targetName: string,
  moduleName: string,
) =>
  `Cannot inject @Inject('${token}') into '${targetName}': the provider '${token}' is not registered in '${moduleName}' or any other previously loaded module.`;
