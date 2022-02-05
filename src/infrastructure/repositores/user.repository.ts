import {v5 as uuid} from 'uuid';

import { IUser } from '../../domain/interfaces/user.interface';
import User from '../../domain/models/user.model';
import { UserDTO } from '../dto/user.dto';


export const userRepository = {
    save: async (userDto: UserDTO): Promise<IUser> => {
        const { name, lastname, email, password, isGoogle } = userDto;
        let user: IUser = new User({
            name,
            lastname,
            email,
            password,
            isGoogle: isGoogle || false
        });
        user.hash = uuid('shop.com', uuid.URL);
        return await user.save();
    },
    edit: async (uid: string, userDto: any): Promise<IUser> => {
        const {isConnected } = userDto;
        const user = await User.findById(uid);
        if(isConnected) {user.isConnected = isConnected;}

        return await user.save();
    },
    findOneById: async (uid: string): Promise<IUser> => {
        return await User.findById(uid);
    },
    findOneByEmail: async (email: string): Promise<IUser> => {
        return await User.findOne({email});
    },
    findOneByhash: async (hash: string): Promise<IUser> => {
        return await User.findOne({hash});
    },
    findMany: async (params:any = {}): Promise<IUser[]> => {
        return await User.find(params);
    },
    findConnected: async (fileds: string = '_id, name, lastname, isConnected'): Promise<IUser[]> => {
        return await User.find().select(fileds).exec();
    }
}