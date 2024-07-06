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
exports.SpecificRoutinePlanStrategy = void 0;
const client_model_1 = __importDefault(require("../../../../models/client.model."));
const plan_model_1 = require("../../../../models/plan.model");
const target_model_1 = require("../../../../models/target.model");
class SpecificRoutinePlanStrategy {
    createPlan(newPlan, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield client_model_1.default.findOne({ "user.id": newPlan.client }).lean();
            const target = yield target_model_1.Target.findById(newPlan.target).lean();
            const planToCreate = {
                startDate: newPlan.startDate,
                finishDate: newPlan.finishDate,
                warmUp: newPlan.warmUp,
                finalBlock: newPlan.finalBlock,
                target: {
                    id: target._id,
                    name: target.name,
                    description: target.description,
                    color: target.color,
                },
                client: {
                    id: client.user.id,
                    name: client.user.name,
                    lastName: client.user.lastName,
                    email: client.user.email,
                    weight: client.weight,
                    height: client.height,
                    conditions: client.conditions,
                    birthDate: client.birthDate,
                },
                trainer: {
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    id: user._id,
                }
            };
            const planCreated = yield plan_model_1.Plan.create(planToCreate);
            return planCreated;
        });
    }
}
exports.SpecificRoutinePlanStrategy = SpecificRoutinePlanStrategy;
