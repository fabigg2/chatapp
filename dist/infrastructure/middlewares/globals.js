"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrors = exports.verfyUserToken = exports.expressValidatorErrors = void 0;
const express_validator_1 = require("express-validator");
const response_1 = require("../utils/response");
const token_1 = require("../utils/token");
/**
 * Catch errors generates by express-validator methods
 * @param req
 * @param res
 * @param next
 * @returns
 */
const expressValidatorErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty())
        return next();
    return (0, response_1.unSuccesfulResponse)(res, errors);
};
exports.expressValidatorErrors = expressValidatorErrors;
const verfyUserToken = (req, res, next) => {
    var _a;
    const token = ((_a = req.headers['x-token']) === null || _a === void 0 ? void 0 : _a.toString()) || 'a';
    try {
        const { _id } = (0, token_1.verifyToken)(token);
        req.params._id = _id;
    }
    catch (err) {
        return (0, response_1.unSuccesfulResponse)(res, { err: 'token invalido' }, 403);
    }
    next();
};
exports.verfyUserToken = verfyUserToken;
/**
 * Catch errors in the request.body.errors variable
 * @param req
 * @param res
 * @param next
 * @returns
 */
const catchErrors = (req, res, next) => {
    const { errors } = req.body;
    if (errors && errors.length > 0)
        return (0, response_1.unSuccesfulResponse)(res, errors, 400);
    next();
};
exports.catchErrors = catchErrors;
