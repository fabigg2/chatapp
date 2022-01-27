import { Router } from "express";
import { body } from "express-validator";
import { userController } from "../controllers/user.controller";
import { catchErrors, expressValidatorErrors } from "../middlewares/globals";
import { userExistByEmail } from "../middlewares/user.middlewares";
// import { body, check } from "express-validator";
// import { productController } from "../controllers/product.controller";
// import { expressValidatorErrors, verfyUserToken } from "../middlewares/globals";


export const userRoutes = Router();

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

userRoutes.post('/',
    [
        body('name', 'name required').notEmpty(),
        body('lastname', 'name required').notEmpty(),
        body('email', 'email required').notEmpty(),
        body('password', 'email required').notEmpty().isString(),
        expressValidatorErrors,
        userExistByEmail,
        catchErrors

    ],
    userController.createUser
);