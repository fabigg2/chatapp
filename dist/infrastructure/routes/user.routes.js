"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controllers/user.controller");
const globals_1 = require("../middlewares/globals");
const user_middlewares_1 = require("../middlewares/user.middlewares");
// import { body, check } from "express-validator";
// import { productController } from "../controllers/product.controller";
// import { expressValidatorErrors, verfyUserToken } from "../middlewares/globals";
exports.userRoutes = (0, express_1.Router)();
/**
 * @openapi
 * tags:
 *  - name: user
 *    description: Everything about users
 */
/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create user
 *     tags:
 *      - user
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfuly.
 *       500:
 *         description: server error
 */
exports.userRoutes.post('/', [
    (0, express_validator_1.body)('name', 'name required').notEmpty(),
    (0, express_validator_1.body)('lastname', 'name required').notEmpty(),
    (0, express_validator_1.body)('email', 'email required').notEmpty(),
    (0, express_validator_1.body)('password', 'email required').notEmpty().isString(),
    globals_1.expressValidatorErrors,
    user_middlewares_1.userExistByEmail,
    globals_1.catchErrors
], user_controller_1.userController.createUser);
