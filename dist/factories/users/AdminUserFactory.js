"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserFactory = void 0;
const user_model_1 = require("../../models/user.model.");
const User_1 = require("./User");
// Concrete factory for creating admin users
class AdminUserFactory {
    createUser(profileInfo) {
        const role = user_model_1.ADMIN;
        const permissions = [];
        return new User_1.UserFactory(role, profileInfo, permissions);
    }
}
exports.AdminUserFactory = AdminUserFactory;
