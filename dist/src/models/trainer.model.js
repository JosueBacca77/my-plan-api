"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const trainerSchema = new mongoose_1.Schema({
    hiredDate: {
        type: Date,
        default: Date.now,
    },
    birthDate: {
        type: Date,
        required: [true, "Trainer birth is required"],
    },
    user: {
        id: {
            type: String,
            required: [true, "User Id is required"],
        },
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
            required: [true, "User email is required"],
        },
        photo: {
            type: String,
            default: null,
        },
    },
});
const Trainer = (0, mongoose_1.model)("Trainer", trainerSchema);
exports.default = Trainer;
