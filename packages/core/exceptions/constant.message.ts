export const MODULE_INVALID_ANNOTATION_ERROR = () =>
  `The class must have an annotation @Module()`;
export const CONTAINER_RESOLUTION_ERROR = (entity: string) =>
  `No '${entity}' was found registered in @modulo.`;
