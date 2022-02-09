import { Document } from "mongoose";

export interface IMessage extends Document{
    from: string
    to: string
    msg: string
    state: number
    date: Date
}