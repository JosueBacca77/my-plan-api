"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN = exports.TRAINER = exports.CLIENT = void 0;
const mongoose_1 = require("mongoose");
const regex_1 = require("../utils/regex");
exports.CLIENT = "client";
exports.TRAINER = "trainer";
exports.ADMIN = "admin";
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    photo: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function () {
                return regex_1.passwordRegex.test(this.password);
            },
            message: "Password must include at least one special character, one lowercase letter, one uppercase letter, and be between 8 and 15 characters long",
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
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
