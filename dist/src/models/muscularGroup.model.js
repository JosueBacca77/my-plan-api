"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuscularGroup = void 0;
const mongoose_1 = require("mongoose");
const muscularGroupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: String,
});
exports.MuscularGroup = (0, mongoose_1.model)("MuscularGroup", muscularGroupSchema);
