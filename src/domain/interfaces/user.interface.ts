import { Document } from "mongoose";

export interface IUser extends Document {
    name: string
    lastname: string
    email: string
    password: string
    isGoogle: boolean
    state: boolean
    isValidated: boolean
    lastSignIn: Date
    picture: string
    rol: string
    hash: string
    isConnected: boolean

}