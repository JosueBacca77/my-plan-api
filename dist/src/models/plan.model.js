"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = require("mongoose");
const targetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Target name is required']
    },
    description: String,
    color: String,
});
const muscularGroupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Muscular group name is required']
    },
    description: String
});
const exerciseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Plan exercise name is required']
    },
    description: String,
    files: [String]
});
const clientSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    userName: String,
    lastName: String,
    email: String,
    birthDate: Date,
    height: Number,
    weight: Number,
    conditions: [String],
});
const exerciseCombinationSchema = new mongoose_1.Schema({
    description: String,
    exercises: [exerciseSchema]
});
const planExercisesSchema = new mongoose_1.Schema({
    exercise: {
        type: exerciseSchema,
        required: [true, 'Plan exercise must have an exercise data']
    },
    day: {
        type: String,
        required: [true, 'Plan exercise must have a day']
    },
    series: String,
    repetitions: String,
    explanation: String,
    metodology: String, //it's for be used insstead of series and repetitions
    combination: exerciseCombinationSchema
});
const planMuscularGroupSchema = new mongoose_1.Schema({
    muscularGroup: {
        type: muscularGroupSchema,
        required: [true, 'Plan muscular group must have a muscular group data']
    },
    exercises: {
        type: [planExercisesSchema],
        required: [true, 'Plan muscular group mus have exercises']
    }
});
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
    target: {
        type: targetSchema,
        required: [true, 'Target plan is required']
    },
    trainer: {
        type: {
            id: {
                type: String,
                required: [true, "Trainer Id is required"],
            },
            name: {
                type: String,
                required: [true, "Trainer name is required"],
            },
            lastName: {
                type: String,
                required: [true, "Trainer name is required"],
            },
            // userName: {
            //   type: String,
            //   required: [true, "Trainer user name is required"],
            // },
            email: {
                type: String,
                required: [true, "Trainer email is required"],
            },
        },
        required: [true, 'Plan must have a trainer data']
    },
    specificRoutine: [
        {
            description: String,
            day: String,
        },
    ],
    client: {
        type: clientSchema
    },
    muscularGroups: {
        type: [planMuscularGroupSchema]
    }
});
exports.Plan = (0, mongoose_1.model)("Plan", planSchema);
