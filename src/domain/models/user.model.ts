import { Schema, model } from 'mongoose';
import { encodePassword } from '../../infrastructure/utils/encript.password';
// import { saveCar } from '../controllers/carController';
// import { encodePassword } from '../helpers/utils';

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              isGoogle:
 *                  type: boolean
 *              state:
 *                  type: boolean
 *              isValidated:
 *                  type: boolean
 *              lastSignIn:
 *                  type: Date
 *              picture:
 *                  type: string
 *              rol:
 *                  type: string
 *          required:
 *              -name
 *              -lastname
 *              -email
 *              -password
 */

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true, sparse: true }
    },
    password: {
        type: String,
        required: true
    },
    isGoogle: {
        type: Boolean,
        default: false,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    isValidated: {
        type: Boolean,
        default: false,
        required: true
    },
    lastSignIn: {
        type: Date
    },
    picture: {
        type: String
    },
    hash: {
        type: String
    },
    rol:{
        type: String,
        enun:['admin', 'regular'],
        default: 'regular'
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const password = encodePassword(this.get('password'));
        this.set('password', password);
    }
    next();
})

export default model('user', userSchema);