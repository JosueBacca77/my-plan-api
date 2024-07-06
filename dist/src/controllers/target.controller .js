"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTarget = exports.patchTarget = exports.postTarget = exports.getTarget = void 0;
const target_model_1 = require("../models/target.model");
const handlerFactory_1 = require("../patterns/factory/handlerFactory");
exports.getTarget = handlerFactory_1.handlerFactory.getDocument(target_model_1.Target);
exports.postTarget = handlerFactory_1.handlerFactory.createDocument(target_model_1.Target);
exports.patchTarget = handlerFactory_1.handlerFactory.updateDocument(target_model_1.Target);
exports.deleteTarget = handlerFactory_1.handlerFactory.deleteDocument(target_model_1.Target);
