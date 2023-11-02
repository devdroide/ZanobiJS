export const MODULE_ERROR = () => `An error has occurred in @Module()`;
export const MODULE_INVALID_PROPERTY = (property) =>
  `The content of the "${property}" property must be type "class".`;
export const MODULE_INVALID_TYPE_PROPERTY = () =>
  `{{#label}} It is not allowed because it does not match the allowed types.`;
export const MODULE_MISSING_PROPERTY = (property) =>
  `missing property '${property}' into the @Module() decorator.`;
