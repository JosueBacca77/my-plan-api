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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMyCurrentPlanService = exports.getMyCurrentPlan = exports.createPlan = void 0;
const plan_model_1 = require("../models/plan.model");
const MuscularGroupsPlanStrategy_1 = require("../patterns/strategy/plans/creation/MuscularGroupsPlanStrategy");
const Plans_1 = require("../patterns/strategy/plans/creation/Plans");
const SpecificRoutinePlanStrategy_1 = require("../patterns/strategy/plans/creation/SpecificRoutinePlanStrategy");
const createPlan = (user, plan) => __awaiter(void 0, void 0, void 0, function* () {
    const createPlanContext = new Plans_1.CreatePlanContext();
    if (!plan.planExercises && plan.specificRoutine) {
        createPlanContext.setStrategy(new SpecificRoutinePlanStrategy_1.SpecificRoutinePlanStrategy());
    }
    if (plan.planExercises && !plan.specificRoutine) {
        createPlanContext.setStrategy(new MuscularGroupsPlanStrategy_1.MuscularGroupPlanStrategy());
    }
    const createdPlan = yield createPlanContext.createPlan(plan, user);
    return createdPlan;
});
exports.createPlan = createPlan;
const getMyCurrentPlan = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield plan_model_1.Plan.findOne({
        'client.id': user._id.toString(),
        active: true,
    }).lean();
    return plan;
});
exports.getMyCurrentPlan = getMyCurrentPlan;
const setMyCurrentPlanService = (planId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield plan_model_1.Plan.findById(planId);
    if (!plan) {
        const response = {
            status: 'error',
            statusCode: 404,
            message: `Plan with id ${planId} not found`,
            data: null,
        };
        return response;
    }
    if (plan.client.id !== userId.toString()) {
        const response = {
            status: 'error',
            statusCode: 403,
            message: `You can only set your own current plan`,
            data: null,
        };
        return response;
    }
    const previousCurrentPlan = yield plan_model_1.Plan.findOne({
        'client.id': userId.toString(),
        _id: { $ne: planId },
        active: true,
    });
    if (previousCurrentPlan) {
        previousCurrentPlan.active = false;
        yield previousCurrentPlan.save();
    }
    if (plan.active) {
        const response = {
            status: 'success',
            statusCode: 200,
            message: `The plan is already the current one!`,
            data: plan,
        };
        return response;
    }
    plan.active = true;
    yield plan.save();
    const response = {
        status: 'success',
        statusCode: 200,
        message: `Current plan set successfully`,
        data: plan,
    };
    return response;
});
exports.setMyCurrentPlanService = setMyCurrentPlanService;
