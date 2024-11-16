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
exports.createAdminService = void 0;
const user_model_1 = require("../models/user.model.");
const handler_1 = require("../patterns/factory/users/handler");
const createAdminService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const factory = (0, handler_1.getUserFactory)(user_model_1.Role.ADMIN);
    const newAdminUser = yield factory.createUser({
        email,
        password,
    });
    const response = {
        status: 'success',
        statusCode: 200,
        message: `Admin user was created successfully`,
        data: newAdminUser,
    };
    return response;
});
exports.createAdminService = createAdminService;
