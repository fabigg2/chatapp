import { Schema, model } from 'mongoose';
import { encodePassword } from '../../infrastructure/utils/encript.password';
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
    }
}, { timestamps: true })


export default model('message', messageSchema);