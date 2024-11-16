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
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const regex_1 = require("../utils/regex");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var Role;
(function (Role) {
    Role["CLIENT"] = "CLIENT";
    Role["TRAINER"] = "TRAINER";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    role: {
        type: String,
        enum: Object.values(Role), // Solo acepta los valores del enum
        required: [true, 'Role is required'],
    },
    photo: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function () {
                return regex_1.passwordRegex.test(this.password);
            },
            message: 'Password must include at least one special character, one lowercase letter, one uppercase letter, and be between 8 and 15 characters long',
        },
        select: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Hash the password with cost of 12
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        next();
    });
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
