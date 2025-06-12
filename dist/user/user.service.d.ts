import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getUserByEmail(email: string): Promise<UserDocument | null>;
    createUser(userData: Partial<User>): Promise<UserDocument>;
    updateUserByEmail(email: string, updateData: Partial<User>): Promise<UserDocument>;
    deleteUserByEmail(email: string): Promise<boolean>;
    doesUserAlreadyExist(email: string): Promise<boolean>;
}
