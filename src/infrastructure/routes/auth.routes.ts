import { Router } from "express";
import { body, check, header } from "express-validator";
import { auth } from "../auth/auth";
// import { userController } from "../controllers/user.controller";
import { catchErrors, expressValidatorErrors, verfyUserToken } from "../middlewares/globals";
import { userExistByEmail } from "../middlewares/user.middlewares";
// import { body, check } from "express-validator";
// import { productController } from "../controllers/product.controller";
// import { expressValidatorErrors, verfyUserToken } from "../middlewares/globals";


export const authRoutes = Router();
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
authRoutes.post('/sign-in',
    [
        body('email', 'invalid email').isEmail(),
        body('password', 'invalid password').notEmpty().isString(),
        expressValidatorErrors
    ],
    auth.signInRegular
);
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
 authRoutes.post('/token',
 [
     check('x-token', 'token required').notEmpty().isString(),
     expressValidatorErrors,
     verfyUserToken
 ],
 auth.logInWithToken
);

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
authRoutes.get('/verify/:hash',
    [
        check('hash', 'invalid hash').notEmpty().isString(),
        expressValidatorErrors
    ],
    auth.vefifyAccountRegistration
);


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
authRoutes.post('/google',
    [
        header('xgtoken', 'google token required').notEmpty().isString().isLength({min:30}),
        expressValidatorErrors,
        auth.googleAuth,
        userExistByEmail,
        catchErrors
    ],
    auth.saveAndAuth
);
