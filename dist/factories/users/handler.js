"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFactory = void 0;
const user_model_1 = require("../../models/user.model.");
const ClientUserFactory_1 = require("./ClientUserFactory");
const getUserFactory = (role) => {
    switch (role) {
        case user_model_1.CLIENT:
            return new ClientUserFactory_1.ClientUserFactory();
        // case ADMIN:
        //   return new AdminUserFactory();
        case user_model_1.TRAINER:
            return new ClientUserFactory_1.ClientUserFactory();
        default:
            return new ClientUserFactory_1.ClientUserFactory();
    }
};
exports.getUserFactory = getUserFactory;
