import { MuscularGroup } from "../models/muscularGroup.model";
import { handlerFactory } from "../patterns/factory/handlerFactory";

// const getAllMuscularGroups = handlerFactory.getAllDocuments(MuscularGroup);

export const getMuscularGroup = handlerFactory.getDocument(MuscularGroup);

export const postMUscularGroup = handlerFactory.createDocument(MuscularGroup);

export const patchMuscularGroup = handlerFactory.updateDocument(MuscularGroup);

export const deleteMuscularGroup = handlerFactory.deleteDocument(MuscularGroup);
