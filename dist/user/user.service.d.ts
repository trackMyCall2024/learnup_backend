import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getUserByEmail(email: string): Promise<User>;
    getUserByToken(token: string): Promise<User>;
    createUser(user: User): Promise<void>;
    putUser(user: UserDocument): Promise<void>;
    doesUserAlreadyExist(email: string): Promise<boolean>;
}
