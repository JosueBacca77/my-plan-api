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
exports.createPlan = void 0;
const MuscularGroupsPlanStrategy_1 = require("../patterns/strategy/plans/creation/MuscularGroupsPlanStrategy");
const Plans_1 = require("../patterns/strategy/plans/creation/Plans");
const SpecificRoutinePlanStrategy_1 = require("../patterns/strategy/plans/creation/SpecificRoutinePlanStrategy");
const createPlan = (user, plan) => __awaiter(void 0, void 0, void 0, function* () {
    const createPlanContext = new Plans_1.CreatePlanContext();
    if (!plan.planExercises && plan.specificRoutine) {
        createPlanContext.setStrategy(new SpecificRoutinePlanStrategy_1.SpecificRoutinePlanStrategy);
    }
    ;
    if (plan.planExercises && !plan.specificRoutine) {
        createPlanContext.setStrategy(new MuscularGroupsPlanStrategy_1.MuscularGroupPlanStrategy);
    }
    ;
    const createdPlan = yield createPlanContext.createPlan(plan, user);
    return createdPlan;
});
exports.createPlan = createPlan;
