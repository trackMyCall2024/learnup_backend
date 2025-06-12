import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Res,
    Query,
    Param,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    Req,
} from "@nestjs/common";
import { Connection } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";
import { UserService } from "src/user/user.service";
import { JwtAuthGuard } from "src/authentification/jwt-auth.guard";
import { LoggerService } from "src/logger/logger.service";

@Controller()
export class AppController {
    constructor(
        private readonly userService: UserService,
        private readonly loggerService: LoggerService,
        @InjectConnection() private readonly connection: Connection,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get("status_db")
    getStatus() {
        const status =
            this.connection.readyState === 1 ? "connected" : "disconnected";
        return { status };
    }

    @UseGuards(JwtAuthGuard)
    @Post("get_user")
    async getUser(@Body() userData) {        
        const emailQeury = userData?.email;
        this.loggerService.debug("enter", emailQeury);

        if (!emailQeury) {
            return
        }

        const doesUserAlreadyExist = await this.userService.doesUserAlreadyExist(userData?.email);

        if (!doesUserAlreadyExist) {
            this.loggerService.debug("no user");

            // const user: User = {};

            // await this.userService.createUser(user);

            return
        }

        const user = await this.userService.getUserByEmail(userData?.email);

        this.loggerService.debug("user", user);

        return user;
    }
}
