"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRes = void 0;
/**
 * put an error object into the request params
 * @param req
 * @param msg
 * @returns
 */
const errorRes = (req, msg) => {
    if (!req.body.errors)
        req.body.errors = [];
    return req.body.errors.push({ msg });
};
exports.errorRes = errorRes;
