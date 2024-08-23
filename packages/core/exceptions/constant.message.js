"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTAINER_RESOLUTION_ENTITY_ERROR = exports.CONTAINER_RESOLUTION_ERROR = exports.MODULE_INVALID_ANNOTATION_ERROR = void 0;
const MODULE_INVALID_ANNOTATION_ERROR = () => `The class must have an annotation @Module()`;
exports.MODULE_INVALID_ANNOTATION_ERROR = MODULE_INVALID_ANNOTATION_ERROR;
const CONTAINER_RESOLUTION_ERROR = (entity, resolutionError) => `${resolutionError} please review '${entity}' and its dependencies.`;
exports.CONTAINER_RESOLUTION_ERROR = CONTAINER_RESOLUTION_ERROR;
const CONTAINER_RESOLUTION_ENTITY_ERROR = (entity) => `Please check that the entity '${entity}' exists and is registered in @modulo`;
exports.CONTAINER_RESOLUTION_ENTITY_ERROR = CONTAINER_RESOLUTION_ENTITY_ERROR;
