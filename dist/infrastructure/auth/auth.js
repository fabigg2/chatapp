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
exports.auth = void 0;
const google_auth_library_1 = require("google-auth-library");
const user_repository_1 = require("../repositores/user.repository");
const encript_password_1 = require("../utils/encript.password");
const response_1 = require("../utils/response");
const token_1 = require("../utils/token");
exports.auth = {
    vefifyAccountRegistration: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { hash } = req.params;
        try {
            const userFound = yield user_repository_1.userRepository.findOneByhash(hash);
            if (!userFound)
                return (0, response_1.unSuccesfulResponse)(res, { error: 'invalid hash' });
            userFound.isValidated = true;
            yield userFound.save();
            (0, response_1.succesfulResponse)(res, userFound);
        }
        catch (error) {
            (0, response_1.unSuccesfulResponse)(res);
        }
    }),
    signInRegular: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userFound = yield user_repository_1.userRepository.findOneByEmail(email);
        if (!userFound)
            return (0, response_1.unSuccesfulResponse)(res, { error: 'user or password incorrect' });
        if (!(0, encript_password_1.compoarePassword)(password, userFound.password))
            return (0, response_1.unSuccesfulResponse)(res, { error: 'user or password incorrect' });
        const token = (0, token_1.genToken)({ _id: userFound._id });
        userFound.password = '';
        (0, response_1.succesfulResponse)(res, { token, user: userFound });
    }),
    googleAuth: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
        const token = req.body.xgToken;
        try {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
            const { aud, email, email_verified, picture, family_name, given_name } = ticket.getPayload();
            console.log(ticket.getPayload());
            // console.log(payload);
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            if (process.env.CLIENT_ID !== aud)
                return (0, response_1.unSuccesfulResponse)(res, { err: 'error on sign in' }, 400);
            req.body.email = email;
            req.body.emailVerified = email_verified;
            req.body.picture = picture;
            req.body.lastname = family_name;
            req.body.name = given_name;
            req.body.password = '12345678Google',
                req.body.isGoogle = true;
            // req.body.picture = picture;
        }
        catch (error) {
            (0, response_1.unSuccesfulResponse)(res);
            console.log(error);
        }
        next();
    }),
    saveAndAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, lastname, email, password, isGoogle, picture } = req.body;
        const currentUser = req.body.currentUser;
        let nUser = { name, lastname, email, password, isGoogle, picture, state: true, isValidated: true, lastSignIn: undefined, rol: 'regular', hash: '' };
        try {
            if (!currentUser) {
                yield user_repository_1.userRepository.save(nUser);
            }
            else if (!currentUser.isGoogle) {
                return (0, response_1.unSuccesfulResponse)(res, { error: 'Sign in with user and password' });
            }
            else {
                const token = (0, token_1.genToken)({ _id: currentUser._id });
                (0, response_1.succesfulResponse)(res, { user: currentUser, token });
            }
        }
        catch (error) {
            console.log(error);
            (0, response_1.unSuccesfulResponse)(res);
        }
    })
};
