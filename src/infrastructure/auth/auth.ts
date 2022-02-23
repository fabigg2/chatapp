import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { userRepository } from "../repositores/user.repository";
import { compoarePassword } from "../utils/encript.password";
import { succesfulResponse, unSuccesfulResponse } from "../utils/response";
import { genToken } from "../utils/token";
import { UserDTO } from '../dto/user.dto';
import { IUser } from "../../domain/interfaces/user.interface";
import { emailValidationAccount } from "../utils/email";

export const auth = {
    vefifyAccountRegistration: async (req: Request, res: Response) => {
        const { hash } = req.params;
        try {
            const userFound = await userRepository.findOneByhash(hash);
            if (!userFound)
                return unSuccesfulResponse(res, { error: 'invalid hash' });

            userFound.isValidated = true;
            await userFound.save()
            succesfulResponse(res, {user: userFound}, 200, 'Account velidation successful');

        } catch (error) {
            unSuccesfulResponse(res);
        }


    },
    signInRegular: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const userFound = await userRepository.findOneByEmail(email);
            if (!userFound){
                return unSuccesfulResponse(res, { error: 'user or password incorrect' }, 400)}
            if (!compoarePassword(password, userFound.password)){
                return unSuccesfulResponse(res, { error: 'user or password incorrect' }, 400)
            }
            const token = genToken({ _id: userFound._id })
            userFound.password = '';
            console.log(userFound);
            succesfulResponse(res, { token, user: userFound });
        } catch (error) {
            console.log(genToken);
        }

    },
    googleAuth: async (req: Request, res: Response, next: NextFunction) => {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const token = req.headers.xgtoken;
        try {
            const ticket = await client.verifyIdToken({
                idToken: String(token),
                audience: process.env.CLIENT_ID
            });
            const { aud, email, email_verified, picture, family_name, given_name }: any = ticket.getPayload();
            // console.log(payload);
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            if (process.env.CLIENT_ID !== aud)
                return unSuccesfulResponse(res, { err: 'error on sign in' }, 400);
            req.body.email = email;
            req.body.emailVerified = email_verified;
            req.body.picture = picture;
            req.body.lastname = family_name;
            req.body.name = given_name;
            req.body.password = '12345678Google';
            req.body.isGoogle = true;
            req.body.isValidated = true;
            // req.body.picture = picture;
        } catch (error) {
            console.log(error);
            unSuccesfulResponse(res);
        }
        next();

    },

    /**
     * @description create a new user, data comes from the middlaware that evaluetes google auth
     * @param req 
     * @param res 
     * @returns 
     */
    saveAndAuth: async (req: Request, res: Response) => {
        const { name, lastname, email, password, isGoogle, picture } = req.body;
        const currentUser: IUser = req.body.currentUser;
        let nUser: UserDTO = { name, lastname, email, password, isGoogle, picture, state: true, isValidated: true, lastSignIn: undefined, rol: 'regular', hash: '', isConnected: false };
        try {
            if (!currentUser) {
                const newUser = await userRepository.save(nUser);
                const token = genToken({ _id: newUser._id });
                succesfulResponse(res, { user: newUser, token });
            } else if (!currentUser.isGoogle) {
                return unSuccesfulResponse(res, { error: 'Sign in with user and password' })
            } else {
                const token = genToken({ _id: currentUser._id });
                succesfulResponse(res, { user: currentUser, token });
            }
        } catch (error) {
            console.log(error);
            unSuccesfulResponse(res);
        }

    },

    logInWithToken: async (req: Request, res: Response) => {
        const { _id } = req.params;
        try {
            const user = await userRepository.findOneById(_id);
            const token = genToken({ _id: user._id });
            succesfulResponse(res, { user, token });
        } catch (error) {
            console.log(error);
            unSuccesfulResponse(res);
        }

    },

    sendValidationLink:async (req: Request, res: Response) => {
        const { email } = req.body;
        try {
            const userFound = await userRepository.findOneByEmail(email);
            if(userFound){
               await emailValidationAccount(userFound.hash, userFound.email);
               return succesfulResponse(res, {email});
            }
            unSuccesfulResponse(res, {error: 'email no found'});
        } catch (error) {
            unSuccesfulResponse(res);
        }
    }
}