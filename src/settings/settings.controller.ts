import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { Settings } from "./settings.schema";

@Controller("settings")
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Post()
    async create(@Body() data: Partial<Settings>) {
        return this.settingsService.createSettings(data);
    }

    @Get(":userId")
    async get(@Param("userId") userId: string) {
        return this.settingsService.getSettings(userId);
    }

    @Put(":userId")
    async update(@Param("userId") userId: string, @Body() update: Partial<Settings>) {
        return this.settingsService.updateSettings(userId, update);
    }

    @Delete(":userId")
    async remove(@Param("userId") userId: string) {
        return this.settingsService.deleteSettings(userId);
    }
}