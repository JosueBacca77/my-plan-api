"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitation = void 0;
const mongoose_1 = require("mongoose");
const invitationSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: [true, "Token is required"],
        select: false,
    },
    email: String,
    phone: String,
    role: {
        type: String,
        required: [true, "role is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tokenExpires: {
        type: Date,
        default: Date.now() + 30 * 60 * 1000,
    },
});
exports.Invitation = (0, mongoose_1.model)("Invitation", invitationSchema);
