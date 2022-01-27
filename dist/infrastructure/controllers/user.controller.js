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
exports.userController = void 0;
const user_repository_1 = require("../repositores/user.repository");
const email_1 = require("../utils/email");
const response_1 = require("../utils/response");
exports.userController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        try {
            const newUser = yield user_repository_1.userRepository.save(user);
            yield (0, email_1.emailValidationAccount)(newUser.hash, newUser.email);
            (0, response_1.succesfulResponse)(res, newUser);
        }
        catch (error) {
            console.log(error);
            (0, response_1.unSuccesfulResponse)(res);
        }
    })
};
