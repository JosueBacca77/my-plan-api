"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const mongoose_1 = require("mongoose");
const targetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: String,
    color: {
        type: String,
        required: [true, "Color is required"],
    },
});
exports.Target = (0, mongoose_1.model)("Target", targetSchema);
