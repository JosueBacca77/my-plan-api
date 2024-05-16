"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const invitation_controler_1 = require("../controllers/invitation.controler");
const newInvitation_schema_1 = require("../controllers/schemas/newInvitation.schema");
const invitationsRoutes = express_1.default.Router();
invitationsRoutes
    .route("/")
    // .get(getAllexercises)
    .post((0, celebrate_1.celebrate)({ body: newInvitation_schema_1.newInvitationSchema }), invitation_controler_1.createInvitation);
exports.default = invitationsRoutes;
