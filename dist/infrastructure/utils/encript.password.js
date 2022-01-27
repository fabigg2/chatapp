"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compoarePassword = exports.encodePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * @description this encode a password
 * @param password type string
 */
const encodePassword = (password) => {
    const round = 10;
    const salt = bcrypt_1.default.genSaltSync(round);
    return bcrypt_1.default.hashSync(password, salt);
};
exports.encodePassword = encodePassword;
/**
 * @description compare a password with a encoded password
 * @param password User password
 * @param hast Password encoded
 * @returns boolean
 */
const compoarePassword = (password, hast) => {
    return bcrypt_1.default.compareSync(password, hast);
};
exports.compoarePassword = compoarePassword;
