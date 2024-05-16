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
exports.Invitation = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const invitationSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: [true, "Token is required"],
        select: false,
    },
    email: String,
    phone: String,
    rol: {
        type: String,
        required: [true, "Rol is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tokenExpires: Date,
});
invitationSchema.index({ email: 1 }, { unique: true });
invitationSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.token)
            next();
        //create a token
        const token = crypto_1.default.randomBytes(32).toString("hex");
        //We shouldn't save this plain text token in DB
        //hash the token
        this.token = crypto_1.default.createHash("sha256").update(token).digest("hex");
        //set expire
        this.tokenExpires = new Date(Date.now() + 30 * 60 * 1000); //expires 30 minutes after creation
        next();
    });
});
exports.Invitation = (0, mongoose_1.model)("Invitation", invitationSchema);
