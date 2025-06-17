import { UserService } from "./user.service";
import { User } from "./user.schema";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(userData: Partial<User>): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateUserByEmail(email: string, updateData: Partial<User>): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteUserByEmail(email: string): Promise<boolean>;
}
