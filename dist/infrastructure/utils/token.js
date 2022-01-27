"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generates token
 * @param user
 * @returns
 */
const genToken = (user) => {
    const secret = process.env.SECRET_WORD_JWT || '';
    return jsonwebtoken_1.default.sign(user, secret, { expiresIn: 60 * 60 });
};
exports.genToken = genToken;
/**
 * Vefifies if a token is valid or hasn't caducated
 * @param token
 * @returns
 */
const verifyToken = (token) => {
    const secret = process.env.SECRET_WORD_JWT || '';
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
