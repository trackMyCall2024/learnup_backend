import { Connection } from "mongoose";
import { UserService } from "src/user/user.service";
import { LoggerService } from "src/logger/logger.service";
export declare class AppController {
    private readonly userService;
    private readonly loggerService;
    private readonly connection;
    constructor(userService: UserService, loggerService: LoggerService, connection: Connection);
    getStatus(): {
        status: string;
    };
    getUser(userData: any): Promise<import("mongoose").Document<unknown, {}, import("../user/user.schema").User> & import("../user/user.schema").User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
