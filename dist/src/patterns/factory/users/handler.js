"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationSchema = exports.getUserFactory = void 0;
const newUser_schema_1 = require("../../../controllers/schemas/newUser.schema");
const user_model_1 = require("../../../models/user.model.");
const AdminUserFactory_1 = require("./AdminUserFactory");
const ClientUserFactory_1 = require("./ClientUserFactory");
const TrainerUserFactory_1 = require("./TrainerUserFactory");
const getUserFactory = (role) => {
    switch (role) {
        case user_model_1.Role.CLIENT:
            return new ClientUserFactory_1.ClientUserFactory();
        case user_model_1.Role.ADMIN:
            return new AdminUserFactory_1.AdminUserFactory();
        case user_model_1.Role.TRAINER:
            return new TrainerUserFactory_1.TrainerUserFactory();
        default:
            return new ClientUserFactory_1.ClientUserFactory();
    }
};
exports.getUserFactory = getUserFactory;
const getValidationSchema = (role) => {
    switch (role) {
        case user_model_1.Role.CLIENT:
            return newUser_schema_1.newClientSchema;
        case user_model_1.Role.TRAINER:
            return newUser_schema_1.newTrainerSchema;
        default:
            return null;
    }
};
exports.getValidationSchema = getValidationSchema;
