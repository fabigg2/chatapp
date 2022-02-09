import { Schema, model } from 'mongoose';


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

const messageSchema = new Schema({
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
})


export default model('message', messageSchema);