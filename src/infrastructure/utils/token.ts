import jwt from 'jsonwebtoken';
/**
 * Generates token
 * @param user 
 * @returns 
 */
 export const genToken = (user: object) => {
    const secret: string = process.env.SECRET_WORD_JWT || 'fafdlfklakfl';
    return jwt.sign(user, secret, { expiresIn: 60 * 60 });
}

/**
 * Vefifies if a token is valid or hasn't caducated
 * @param token 
 * @returns 
 */
export const verifyToken = (token: string) => {
    const secret: string = process.env.SECRET_WORD_JWT || '';
    return jwt.verify(token, secret);
}