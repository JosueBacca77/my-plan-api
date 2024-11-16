"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitation = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model.");
const invitationSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: [true, 'Token is required'],
        select: false,
    },
    email: String,
    phone: String,
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: Object.values(user_model_1.Role), // Aquí defines los valores permitidos a partir del enum
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tokenExpires: {
        type: Date,
        default: () => Date.now() + 30 * 60 * 1000,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
});
exports.Invitation = (0, mongoose_1.model)('Invitation', invitationSchema);
