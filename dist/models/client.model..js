"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
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
    birthDate: {
        type: Date,
        required: [true, "Client birhtDate is required"],
    },
    height: {
        type: Number,
        required: [true, "Client height is required"],
    },
    weight: {
        type: Number,
        required: [true, "Client weight is required"],
    },
    conditions: {
        type: [String],
        default: null,
    },
});
const Client = (0, mongoose_1.model)("Client", clientSchema);
exports.default = Client;
