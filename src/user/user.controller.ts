import { Controller, Post, Put, Delete, Body, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.schema";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() userData: Partial<User>) {
        // sign in method and check

        // when user is created -> create history
        return this.userService.createUser(userData);
    }

    @Put()
    async updateUserByEmail(@Query("email") email: string, @Body() updateData: Partial<User>) {
        return this.userService.updateUserByEmail(email, updateData);
    }

    @Delete()
    async deleteUserByEmail(@Query("email") email: string) {
        return this.userService.deleteUserByEmail(email);
    }
}