import { Date } from "mongoose"

export class UserDTO {
    readonly name!: string
    readonly lastname!: string
    readonly email!: string
    readonly password!: string
    readonly isGoogle!: boolean
    readonly state!: boolean
    readonly isValidated!: boolean
    readonly lastSignIn!: string | undefined
    readonly picture!: string
    readonly rol!: string
    readonly hash!: string
    readonly isConnected !: boolean;

}