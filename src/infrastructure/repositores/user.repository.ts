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
    findOneById: async (uid: string): Promise<IUser> => {
        return await User.findById(uid);
    },
    findOneByEmail: async (email: string): Promise<IUser> => {
        return await User.findOne({email});
    },
    findOneByhash: async (hash: string): Promise<IUser> => {
        return await User.findOne({hash});
    },
    findMany: async (): Promise<IUser[]> => {
        return await User.find();
    }
}