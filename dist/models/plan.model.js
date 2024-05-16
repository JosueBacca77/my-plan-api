"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.Schema({
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
    },
    finishDate: {
        type: Date,
        required: [true, "Finish date is required"],
    },
    warmUp: String,
    finalBlock: String,
    specificRoutine: [
        {
            description: String,
            day: String,
        },
    ],
    trainer: {
        id: {
            type: String,
            required: [true, "Trainer Id is required"],
        },
        name: {
            type: String,
            required: [true, "Trainer name is required"],
        },
        userName: {
            type: String,
            required: [true, "Trainer user name is required"],
        },
        email: {
            type: String,
            required: [true, "Trainer email is required"],
        },
    },
});
const Plan = (0, mongoose_1.model)("Plan", planSchema);
exports.default = Plan;
