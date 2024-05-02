const MuscularGroup = require("../models/muscularGroup.model");

const handlerFactory = require("./handlerFactory");

const getAllMuscularGroups = handlerFactory.getAllDocuments(MuscularGroup);

const getMuscularGroup = handlerFactory.getDocument(MuscularGroup);

const postMUscularGroup = handlerFactory.createDocument(MuscularGroup);

const patchMuscularGroup = handlerFactory.updateDocument(MuscularGroup);

const deleteMuscularGroup = handlerFactory.deleteDocument(MuscularGroup);

module.exports = {
  getAllMuscularGroups,
  getMuscularGroup,
  postMUscularGroup,
  patchMuscularGroup,
  deleteMuscularGroup,
};
