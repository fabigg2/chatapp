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
exports.isVerified = exports.userExist = exports.userExistByEmail = void 0;
const user_repository_1 = require("../repositores/user.repository");
const common_1 = require("../utils/common");
const response_1 = require("../utils/response");
const userExistByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        let user = yield user_repository_1.userRepository.findOneByEmail(email);
        if (user && user._id) {
            // console.log(user);
            (0, common_1.errorRes)(req, `${email} already exist`);
            req.body.currentUser = user;
        }
    }
    catch (error) {
        (0, response_1.unSuccesfulResponse)(res);
        console.log(error);
    }
    next();
});
exports.userExistByEmail = userExistByEmail;
const userExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const userFound = yield user_repository_1.userRepository.findOneById(String(_id));
        if (userFound && userFound._id) {
            req.body.currrentUser = userFound;
            return next();
        }
        (0, response_1.unSuccesfulResponse)(res, { msg: 'token contain incorrect data' });
    }
    catch (err) {
        return (0, response_1.unSuccesfulResponse)(res);
    }
});
exports.userExist = userExist;
const isVerified = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currrentUser = req.body.currrentUser;
    try {
        if (currrentUser && currrentUser.isValidated)
            return next();
        (0, common_1.errorRes)(req, 'user needs to verify account');
    }
    catch (err) {
        return (0, response_1.unSuccesfulResponse)(res, { err: 'token invalido' }, 403);
    }
});
exports.isVerified = isVerified;
