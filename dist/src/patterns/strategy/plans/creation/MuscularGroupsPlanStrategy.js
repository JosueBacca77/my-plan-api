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
exports.MuscularGroupPlanStrategy = void 0;
const client_model_1 = __importDefault(require("../../../../models/client.model."));
const exercise_model_1 = __importDefault(require("../../../../models/exercise.model"));
const muscularGroup_model_1 = require("../../../../models/muscularGroup.model");
const plan_model_1 = require("../../../../models/plan.model");
const target_model_1 = require("../../../../models/target.model");
class MuscularGroupPlanStrategy {
    createPlan(newPlan, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield client_model_1.default.findById(newPlan.client).lean();
            const target = yield target_model_1.Target.findById(newPlan.target).lean();
            const plansMuscularGroup = [];
            for (let index = 0; index < newPlan.planExercises.length; index++) {
                const newPlanExercise = newPlan.planExercises[index];
                const exercise = yield exercise_model_1.default.findById(newPlanExercise.exercise).lean();
                const planExercise = Object.assign(Object.assign({}, newPlanExercise), { exercise: {
                        name: exercise.name,
                        description: exercise.description,
                        files: exercise.files,
                    } });
                const foundPlanMuscularGroup = plansMuscularGroup.find((plan) => plan.muscularGroup.id === exercise.muscularGroup);
                if (foundPlanMuscularGroup) {
                    foundPlanMuscularGroup.exercises.push(planExercise);
                }
                else {
                    const muscularGroup = yield muscularGroup_model_1.MuscularGroup.findById(exercise.muscularGroup).lean();
                    const planMuscularGroup = {
                        muscularGroup: {
                            id: muscularGroup._id,
                            name: muscularGroup.name,
                            description: muscularGroup.description,
                        },
                        exercises: [planExercise],
                    };
                    plansMuscularGroup.push(planMuscularGroup);
                }
            }
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
                },
                muscularGroups: plansMuscularGroup,
            };
            const planCreated = yield plan_model_1.Plan.create(planToCreate);
            return planCreated;
        });
    }
}
exports.MuscularGroupPlanStrategy = MuscularGroupPlanStrategy;
