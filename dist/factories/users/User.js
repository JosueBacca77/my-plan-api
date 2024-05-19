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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const user_model_1 = __importDefault(require("../../models/user.model."));
// Implement the User class
class UserFactory {
    constructor(role, profileInfo, permissions) {
        this.role = role;
        this.profileInfo = profileInfo;
        this.permissions = permissions;
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.create({
                name: this.profileInfo.name,
                lastName: this.profileInfo.lastName,
                email: this.profileInfo.email,
                password: this.profileInfo.password,
                role: this.role,
            });
        });
    }
}
exports.UserFactory = UserFactory;
