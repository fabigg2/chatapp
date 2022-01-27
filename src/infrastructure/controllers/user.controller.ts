import { Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { userRepository } from "../repositores/user.repository";
import { emailValidationAccount } from "../utils/email";
import { succesfulResponse, unSuccesfulResponse } from "../utils/response";

export const userController = {
    createUser: async (req: Request, res: Response) => {
        const user: UserDTO = req.body;
        
        try {
            const newUser = await userRepository.save(user);
            await emailValidationAccount(newUser.hash, newUser.email);
            succesfulResponse(res, newUser);
        } catch (error) {
            console.log(error)
            unSuccesfulResponse(res);
        }

    }
} 