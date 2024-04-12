export const MODULE_INVALID_ANNOTATION_ERROR = () =>
  `The class must have an annotation @Module()`;
export const CONTAINER_RESOLUTION_ERROR = (entity: string) =>
  `'${entity}' is not registered in any @module.`;
// export const CONTAINER_RESOLUTION_INJECT_ERROR = (
//   entity: string,
//   targetName: any,
// ) =>
//   `'@Inject(${entity})' was not found in any loaded @module. Check the "${targetName}" file`;
