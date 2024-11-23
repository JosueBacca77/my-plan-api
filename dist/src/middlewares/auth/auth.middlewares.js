"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClient = void 0;
const user_model_1 = require("../../models/user.model.");
const isClient = (req, res, next) => {
    if (req.user.role === user_model_1.Role.CLIENT) {
        return next();
    }
    return res.status(403).json({ message: 'You are not a client' });
};
exports.isClient = isClient;
