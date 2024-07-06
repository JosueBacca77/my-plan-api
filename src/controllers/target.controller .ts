import { Target } from "../models/target.model";
import { handlerFactory } from "../patterns/factory/handlerFactory";

export const getTarget = handlerFactory.getDocument(Target);

export const postTarget = handlerFactory.createDocument(Target);

export const patchTarget = handlerFactory.updateDocument(Target);

export const deleteTarget = handlerFactory.deleteDocument(Target);
