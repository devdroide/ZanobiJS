export const MODULE_ERROR = () =>
  'An error has occurred in @Module(), please check the detail field';
export const MODULE_INVALID_ENTITY = (entity) =>
  `The content of the "${entity}" entity must be type "class".`;
export const MODULE_INVALID_TYPE_ENTITY = (entity) =>
  `There are ${entity} that do not match the allowed types "class" or "object with provider and use value".`;
export const MODULE_MISSING_ENTITY = (entity) =>
  `missing entity '${entity}' into the @Module() decorator.`;
export const MODULE_SOMETHING_WRONG = (entity) =>
  `something is wrong in the '${entity}' entity of @module`;
export const MSG_PATTERN_EXIST = (patternName: string) =>
  `'${patternName}' as a pattern already exists`;
export const MSG_SCHEMA_PATTERN_EXIST = (schemaName: string, exist: boolean) =>
  `'${schemaName}' as a schema to apply patterns ${exist ? 'already' : 'not'} exists`;
