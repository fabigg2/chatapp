import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { IUser } from "../../domain/interfaces/user.interface";
import { userRepository } from "../repositores/user.repository";
import { errorRes } from "../utils/common";
import { unSuccesfulResponse } from "../utils/response";
import { verifyToken } from "../utils/token";

/**
 * Catch errors generates by express-validator methods
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
 export const expressValidatorErrors = (req: Request, res: Response, next:any)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())
        return next()
    return unSuccesfulResponse(res, errors);
}


export const verfyUserToken = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.headers['x-token']?.toString() || 'a';
    try{
        const {_id}:any = verifyToken(token);
    
        req.params._id = _id;
    }catch(err){
        return unSuccesfulResponse(res, {err:'token invalido'}, 403);
    }
    next();
}


/**
 * Catch errors in the request.body.errors variable
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
 export const catchErrors = (req: Request , res: Response, next:NextFunction )=>{
    const {errors} = req.body;
    if(errors && errors.length > 0)
        return unSuccesfulResponse(res, errors, 400);
    next();
}

