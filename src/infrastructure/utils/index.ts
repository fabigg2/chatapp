import {errorRes} from './common';
import {emailValidationAccount} from './email';
import {encodePassword, compoarePassword} from './encript.password';
import {uploadImage} from './image';
import {succesfulResponse, unSuccesfulResponse} from './response';
import {genToken, verifyToken} from './token';



export default {
    errorRes,
    emailValidationAccount,
    encodePassword,
    compoarePassword,
    uploadImage,
    succesfulResponse,
    unSuccesfulResponse,
    genToken, verifyToken
}