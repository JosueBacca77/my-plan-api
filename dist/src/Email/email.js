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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = require("path");
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const constants_1 = require("./constants");
class EmailService {
    constructor() {
        console.log(__dirname);
        this.createHandleBarsTransporter();
    }
    ;
    createHandleBarsTransporter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter = nodemailer_1.default.createTransport({
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            const handlebarsOptions = {
                viewEngine: {
                    extName: '.hbs',
                    partialsDir: (0, path_1.join)(__dirname, 'views'),
                    layoutsDir: (0, path_1.join)(__dirname, 'views'),
                    defaultLayout: '',
                },
                viewPath: (0, path_1.join)(__dirname, 'views'),
                extName: '.hbs',
            };
            this.transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarsOptions));
        });
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: `${constants_1.EMAIL.FROM} <${process.env.EMAIL_FROM}>`,
                to: options.to,
                subject: options.subject,
                template: options.template,
                context: options.context,
            };
            try {
                yield this.transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
        });
    }
    sendInvitation(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendMail({
                    to: options.to,
                    subject: constants_1.EMAIL_INVITATION.SUBJECT,
                    template: constants_1.EMAIL_INVITATION.TEMPLATE,
                    context: { firstName: options.firstName, url: `${constants_1.EMAIL_INVITATION.URL}?token=${options.token}` },
                });
            }
            catch (error) {
                console.error('Error sending invitation email:', error);
            }
        });
    }
}
exports.EmailService = EmailService;
// // Ejemplo de uso
// (async () => {
//   const emailService = new EmailService();
//   await emailService.sendMail({
//     to: 'recipient@example.com',
//     subject: 'Welcome to Our Service',
//     template: 'welcome',
//     context: { firstName: 'John', url: 'https://example.com' },
//   });
// })();
