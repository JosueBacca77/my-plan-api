"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlanController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const plans_service_1 = require("../services/plans.service");
const client_model_1 = __importDefault(require("../models/client.model."));
const user_model_1 = require("../models/user.model.");
exports.createPlanController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = req.body;
    const user = req.user;
    if (user.role !== user_model_1.Role.TRAINER) {
        const response = {
            status: 'error',
            statusCode: 403,
            message: `Plans can only be created by a trainer user`,
            data: null,
        };
        res.status(response.statusCode).json(response);
    }
    //Validate client
    if (!(yield client_model_1.default.find({ id: plan.client }))) {
        const response = {
            status: 'error',
            statusCode: 400,
            message: `Client with id ${plan.client} doesn't exists`,
            data: null,
        };
        return response;
    }
    const createdPlan = yield (0, plans_service_1.createPlan)(user, plan);
    const response = {
        status: 'success',
        statusCode: 201,
        message: `Plan created successfully`,
        data: createdPlan,
    };
    res.status(response.statusCode).json(response);
}));
