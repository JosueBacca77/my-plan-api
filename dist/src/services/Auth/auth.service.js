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
exports.protect = exports.changedPasswordAfter = exports.logInService = exports.signUpService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../../models/user.model."));
const invitation_model_1 = require("../../models/invitation.model");
const handler_1 = require("../../patterns/factory/users/handler");
const appError_1 = __importDefault(require("../../utils/appError"));
const checkPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield bcryptjs_1.default.compare(candidatePassword, userPassword);
        return res;
    });
};
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const generateUserToken = (user) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() +
            parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true, //no será accesible desde JavaScript, mitigando ataques XSS
        //req.secure ins an express variable
        //we can access to this because of app.set("trust proxy", 1);
        // secure: true // It will only be sent in https requests
    };
    //ADDITIONAL CONSIDERATION: If you're using a load balancer or reverse proxy, ensure it's configured to pass the secure flag correctly.
    const resp = {
        token,
        cookieOptions,
    };
    return resp;
};
const signUpService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedToken = crypto_1.default
        .createHash('sha256')
        .update(body.token)
        .digest('hex');
    const invitation = yield invitation_model_1.Invitation.findOne({ token: hashedToken });
    if (!invitation) {
        const response = {
            status: 'error',
            statusCode: 401,
            message: `User hasn't been invited`,
            data: null,
        };
        return response;
    }
    if (invitation.isUsed) {
        const response = {
            status: 'error',
            statusCode: 401,
            message: `Invitation has already been used and user created successfully`,
            data: null,
        };
        return response;
    }
    //Check invitation is not expired
    if (invitation.tokenExpires < new Date()) {
        const response = {
            status: 'error',
            statusCode: 401,
            message: `Invitation for ${invitation.email} has expired`,
            data: {
                foundInvitation: invitation,
            },
        };
        return response;
    }
    const validationSchema = (0, handler_1.getValidationSchema)(invitation.role);
    if (!validationSchema) {
        const response = {
            status: 'error',
            statusCode: 400,
            message: 'Invalid role',
            data: null,
        };
        return response;
    }
    const newUserData = Object.assign(Object.assign({}, body), { email: invitation.email, role: invitation.role });
    try {
        const { error } = validationSchema.validate(newUserData);
        if (error) {
            const response = {
                status: 'error',
                statusCode: 400,
                message: 'Validation error',
                data: error.details,
            };
            return response;
        }
    }
    catch (validationError) {
        const response = {
            status: 'error',
            statusCode: 400,
            message: 'Validation failed',
            data: validationError,
        };
        return response;
    }
    const factory = (0, handler_1.getUserFactory)(invitation.role);
    const newUser = yield factory.createUser(newUserData);
    //Set invitaation as used
    invitation.isUsed = true;
    yield invitation.save();
    const response = {
        status: 'success',
        statusCode: 200,
        message: 'User registered successfully',
        data: newUser,
    };
    return response;
});
exports.signUpService = signUpService;
const logInService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email }).select('+password').lean();
    const validPassword = yield checkPassword(password, user.password);
    if (!validPassword) {
        const res = {
            user: null,
            generatedToken: null,
        };
        return res;
    }
    const tokenData = generateUserToken(user);
    const resp = {
        generatedToken: tokenData,
        user,
    };
    return resp;
});
exports.logInService = logInService;
const changedPasswordAfter = function (JWTTimestamp, passwordChangedAt) {
    //timestamp that indicates when the token was issued
    //if the user hasn't changed their password (doesnt have passwordChangedAt), return false
    if (passwordChangedAt) {
        //user has change its password
        const changedTimestamp = parseInt((passwordChangedAt.getTime() / 1000).toString(), 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};
exports.changedPasswordAfter = changedPasswordAfter;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new appError_1.default('You are not logged in! Please log in to get access', 401));
    }
    try {
        // Crear una promesa para jwt.verify
        const decoded = yield new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
        // Buscar usuario por ID
        const freshUser = yield user_model_1.default.findById(decoded.id).lean();
        if (!freshUser) {
            return next(new appError_1.default('The user belonging to this token does no longer exist', 401));
        }
        if ((0, exports.changedPasswordAfter)(decoded.iat, freshUser.passwordChangedAt)) {
            return next(new appError_1.default('User recently changed password! Please log in again', 401));
        }
        //Grant access to protected route
        req.user = freshUser;
        next();
    }
    catch (error) {
        return next(new appError_1.default('You are not logged in! Please log in to get access', 401));
    }
});
exports.protect = protect;
