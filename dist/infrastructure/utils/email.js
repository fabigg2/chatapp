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
exports.emailValidationAccount = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const emailValidationAccount = (hash, email) => __awaiter(void 0, void 0, void 0, function* () {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || '');
    const msg = {
        to: email,
        from: 'cfgarcesg@unipacifico.edu.co',
        subject: 'Verify your account',
        text: 'You have created a new account in Shop XXX',
        html: `<div>
            <h3>Account verification</h3>
            <p>Click in the button below to verify your account</p>
            <a href="http://localhost:5000/auth/verify/${hash}">Verify account</a>
        </div>`,
    };
    return yield mail_1.default.send(msg);
});
exports.emailValidationAccount = emailValidationAccount;
