"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// import { saveCar } from '../controllers/carController';
// import { encodePassword } from '../helpers/utils';
/**
 * @swagger
 * components:
 *  schemas:
 *      Message:
 *          type: object
 *          properties:
 *              from:
 *                  type: string
 *              to:
 *                  type: string
 *              msg:
 *                  type: string
 *          required:
 *              -from
 *              -to
 *              -msg
 */
const messageSchema = new mongoose_1.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('message', messageSchema);
