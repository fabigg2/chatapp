"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const encript_password_1 = require("../../infrastructure/utils/encript.password");
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
const userSchema = new mongoose_1.Schema({
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
    rol: {
        type: String,
        enun: ['admin', 'regular'],
        default: 'regular'
    },
    isConnected: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const password = (0, encript_password_1.encodePassword)(this.get('password'));
            this.set('password', password);
        }
        next();
    });
});
exports.default = (0, mongoose_1.model)('user', userSchema);
