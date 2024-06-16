"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExercise = exports.patchExercise = exports.postExercise = exports.getExercise = void 0;
const exercise_model_1 = __importDefault(require("../models/exercise.model"));
const handlerFactory_1 = require("../patterns/factory/handlerFactory");
exports.getExercise = handlerFactory_1.handlerFactory.getDocument(exercise_model_1.default);
exports.postExercise = handlerFactory_1.handlerFactory.createDocument(exercise_model_1.default);
exports.patchExercise = handlerFactory_1.handlerFactory.updateDocument(exercise_model_1.default);
exports.deleteExercise = handlerFactory_1.handlerFactory.deleteDocument(exercise_model_1.default);
