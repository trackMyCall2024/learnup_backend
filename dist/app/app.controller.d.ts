import { Connection } from "mongoose";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.schema";
import { LoggerService } from "src/logger/logger.service";
export declare class AppController {
    private readonly userService;
    private readonly loggerService;
    private readonly connection;
    constructor(userService: UserService, loggerService: LoggerService, connection: Connection);
    getStatus(): {
        status: string;
    };
    getUser(userData: any): Promise<User>;
}
