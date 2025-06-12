import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { Friend } from "./friend.schema";

@Controller("friend")
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @Post()
    async create(@Body() data: Partial<Friend>) {
        return this.friendService.createFriendList(data);
    }

    @Get(":userId")
    async getList(@Param("userId") userId: string) {
        return this.friendService.getFriendList(userId);
    }

    @Put(":userId")
    async update(@Param("userId") userId: string, @Body("friends") friendIds: string[]) {
        return this.friendService.updateFriendList(userId, friendIds);
    }

    @Delete(":userId")
    async remove(@Param("userId") userId: string) {
        return this.friendService.deleteFriendList(userId);
    }
}