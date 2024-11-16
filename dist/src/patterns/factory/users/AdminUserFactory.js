"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserFactory = void 0;
const user_model_1 = require("../../../models/user.model.");
const User_1 = require("./User");
// Concrete factory for creating admin users
class AdminUserFactory {
    createUser(profileInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = user_model_1.Role.ADMIN;
            const permissions = [];
            const userFactory = new User_1.UserFactory(role, profileInfo, permissions);
            const user = yield userFactory.createUser();
            const admin = {
                user: {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                },
            };
            return admin;
        });
    }
}
exports.AdminUserFactory = AdminUserFactory;
