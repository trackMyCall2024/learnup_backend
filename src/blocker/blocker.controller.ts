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

    @Put(":website_id")
    async update(@Param("website_id") websiteId: string, @Body("website") website: string) {
        return this.blockerService.updateBlocker(websiteId, website);
    }

    @Delete(":website_id")
    async remove(@Param("website_id") websiteID: string) {
        return this.blockerService.deleteBlocker(websiteID);
    }
}