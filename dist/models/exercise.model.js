"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const exerciseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: String,
    files: [String],
    muscularGroup: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "MuscularGroup",
    },
});
const Exercise = (0, mongoose_1.model)("Exercise", exerciseSchema);
exports.default = Exercise;
