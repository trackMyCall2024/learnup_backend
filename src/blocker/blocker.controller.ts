import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { BlockerService } from "./blocker.service";
import { Blocker } from "./blocker.schema";

@Controller("blocker")
export class BlockerController {
    constructor(private readonly blockerService: BlockerService) {}

    @Post()
    async create(@Body() data: Partial<Blocker>) {
        return this.blockerService.createBlocker(data);
    }

    @Get(":userId")
    async get(@Param("userId") userId: string) {
        return this.blockerService.getBlocker(userId);
    }

    @Put(":userId")
    async update(@Param("userId") userId: string, @Body("websites") websites: string[]) {
        return this.blockerService.updateBlocker(userId, websites);
    }

    @Delete(":userId")
    async remove(@Param("userId") userId: string) {
        return this.blockerService.deleteBlocker(userId);
    }
}