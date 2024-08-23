"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseSchemaInject = exports.baseSchema = void 0;
const Joi = require("joi");
const itemService = Joi.object({
    provider: Joi.string().required(),
    useValue: Joi.any().required(),
});
exports.baseSchema = Joi.array()
    .required()
    .items(Joi.function())
    .required();
exports.baseSchemaInject = Joi.array()
    .required()
    .items(Joi.function(), itemService)
    .required();
