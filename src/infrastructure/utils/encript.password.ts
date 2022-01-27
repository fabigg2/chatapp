import bcrypt from 'bcrypt';

/**
 * @description this encode a password
 * @param password type string
 */
export const encodePassword = (password: string) => {
    const round: number = 10;
    const salt = bcrypt.genSaltSync(round);
    return bcrypt.hashSync(password, salt);
}




/**
 * @description compare a password with a encoded password
 * @param password User password
 * @param hast Password encoded
 * @returns boolean
 */
export const compoarePassword = (password: string, hast: string) => {
    return bcrypt.compareSync(password, hast);
}