"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unSuccesfulResponse = exports.succesfulResponse = void 0;
/**
 * @description send a response as answer of a succesful request
 * @param res express response to send a response
 * @param data is a data to send
 * @param code request code
 * @param msg message
 */
const succesfulResponse = (res, data, code = 200, msg = 'Successful') => {
    res.status(code).json({
        ok: true,
        msg,
        data
    });
};
exports.succesfulResponse = succesfulResponse;
/**
 * @description send a response as answer of a unsuccesful request
 * @param res
 * @param error
 * @param code
 * @param msg
 */
const unSuccesfulResponse = (res, errors = { err: 'something went wrong. contact your server admistrator' }, code = 500, msg = 'Unsuccessful') => {
    res.status(code).json({
        ok: false,
        msg,
        errors
    });
};
exports.unSuccesfulResponse = unSuccesfulResponse;
