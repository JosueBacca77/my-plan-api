import { handlerFactory } from "../common/handlerFactory";

const MuscularGroup = require("../models/muscularGroup.model");

// const getAllMuscularGroups = handlerFactory.getAllDocuments(MuscularGroup);

export const getMuscularGroup = handlerFactory.getDocument(MuscularGroup);

export const postMUscularGroup = handlerFactory.createDocument(MuscularGroup);

export const patchMuscularGroup = handlerFactory.updateDocument(MuscularGroup);

export const deleteMuscularGroup = handlerFactory.deleteDocument(MuscularGroup);
