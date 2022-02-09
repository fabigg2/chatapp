"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
 *              state:
 *                  type: number
  *              date:
 *                  type: date
 *          required:
 *              -from
 *              -to
 *              -msg
 *              -state
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
    },
    state: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        required: false
    }
});
exports.default = (0, mongoose_1.model)('message', messageSchema);
