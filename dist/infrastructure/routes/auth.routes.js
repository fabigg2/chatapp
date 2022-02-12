"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../auth/auth");
// import { userController } from "../controllers/user.controller";
const globals_1 = require("../middlewares/globals");
const user_middlewares_1 = require("../middlewares/user.middlewares");
// import { body, check } from "express-validator";
// import { productController } from "../controllers/product.controller";
// import { expressValidatorErrors, verfyUserToken } from "../middlewares/globals";
exports.authRoutes = (0, express_1.Router)();
/**
 * @openapi
 * tags:
 *  - name: auth
 *    description: Everything about authentication
 *
 */
/**
 * @openapi
 * /auth/sign-in:
 *   post:
 *     summary: Log in with email and password
 *     tags:
 *      - auth
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                     email:
 *                         type: string
 *                     password:
 *                         type: string
 *     responses:
 *       200:
 *         description: .
 *         content:
 *          application/json:
 *            schema:
 *                 type: object
 *                 properties:
 *                     ok:
 *                         type: boolean
 *                     msg:
 *                         type: string
 *                     data:
 *                         type: object
 *       500:
 *         description: server error
 */
exports.authRoutes.post('/sign-in', [
    (0, express_validator_1.body)('email', 'invalid email').isEmail(),
    (0, express_validator_1.body)('password', 'invalid password').notEmpty().isString(),
    globals_1.expressValidatorErrors
], auth_1.auth.signInRegular);
/**
 * @openapi
 * /auth/token:
 *   post:
 *     summary: Log in with email and password
 *     tags:
 *      - auth
 *     parameters:
 *         - in: header
 *           name: x-token
 *           required: true
 *
 *     responses:
 *       200:
 *         description: .
 *         content:
 *          application/json:
 *            schema:
 *                 type: object
 *                 properties:
 *                     ok:
 *                         type: boolean
 *                     msg:
 *                         type: string
 *                     data:
 *                         type: object
 *       500:
 *         description: server error
 */
exports.authRoutes.post('/token', [
    (0, express_validator_1.check)('x-token', 'token required').notEmpty().isString(),
    globals_1.expressValidatorErrors,
    globals_1.verfyUserToken
], auth_1.auth.logInWithToken);
/**
 * @openapi
 * /verify/{hash}:
 *   get:
 *     summary: verify account
 *     tags:
 *      - auth
 *     parameters:
 *         - in: path
 *           name: hash
 *           required: true
 *     responses:
 *       200:
 *         description: .
 *         content:
 *          application/json:
 *            schema:
 *                 type: object
 *                 properties:
 *                     ok:
 *                         type: boolean
 *                     msg:
 *                         type: string
 *                     data:
 *                         type: object
 *       500:
 *         description: server error
 */
exports.authRoutes.get('/verify/:hash', [
    (0, express_validator_1.check)('hash', 'invalid hash').notEmpty().isString(),
    globals_1.expressValidatorErrors
], auth_1.auth.vefifyAccountRegistration);
/**
 * @openapi
 * /auth/google:
 *   post:
 *     summary: Log in with google account
 *     tags:
 *      - auth
 *     parameters:
 *         - in: header
 *           name: xgtoken
 *           required: true
 *     responses:
 *       200:
 *         description: .
 *         content:
 *          application/json:
 *            schema:
 *                 type: object
 *                 properties:
 *                     ok:
 *                         type: boolean
 *                     msg:
 *                         type: string
 *                     data:
 *                         type: object
 *       500:
 *         description: server error
 */
exports.authRoutes.post('/google', [
    (0, express_validator_1.header)('xgtoken', 'google token required').notEmpty().isString().isLength({ min: 30 }),
    globals_1.expressValidatorErrors,
    auth_1.auth.googleAuth,
    user_middlewares_1.userExistByEmail,
    globals_1.catchErrors
], auth_1.auth.saveAndAuth);
