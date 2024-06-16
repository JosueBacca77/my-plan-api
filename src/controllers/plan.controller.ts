import Exercise from "../models/exercise.model";
import { handlerFactory } from "../patterns/factory/handlerFactory";

export const getExercise = handlerFactory.getDocument(Exercise);

export const postExercise = handlerFactory.createDocument(Exercise);

export const patchExercise = handlerFactory.updateDocument(Exercise);

export const deleteExercise = handlerFactory.deleteDocument(Exercise);
