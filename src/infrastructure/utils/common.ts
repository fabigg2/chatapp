import { Request } from "express";

/**
 * put an error object into the request params
 * @param req 
 * @param msg 
 * @returns 
 */
 export const errorRes = (req: Request, msg: string) => {
    if (!req.body.errors)
        req.body.errors = [];
    return req.body.errors.push({ msg });

}