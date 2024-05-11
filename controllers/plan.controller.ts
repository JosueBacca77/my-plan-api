import { handlerFactory } from "../common/handlerFactory";

import Exercise from "../models/exercise.model";

// const getAllExercises = handlerFactory.getAllDocuments(Exercise);

export const getExercise = handlerFactory.getDocument(Exercise);

export const postExercise = handlerFactory.createDocument(Exercise);

export const patchExercise = handlerFactory.updateDocument(Exercise);

export const deleteExercise = handlerFactory.deleteDocument(Exercise);
