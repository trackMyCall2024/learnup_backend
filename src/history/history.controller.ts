import { Controller, Get, Post, Body, Param, Put, Delete, Query, NotFoundException } from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './history.schema';
import { DirectoryType } from 'src/directory/directory.schema';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Post()
    async create(@Body() data: Partial<History>) {
        return this.historyService.createHistoryList(data);
    }

    @Get(':id')
    async getList(@Param('id') userId: string, @Query('directory_type') directoryType: DirectoryType) {
        return this.historyService.getHistoryList(userId, directoryType);
    }

    @Put(':id')
    async update(
        @Param('id') userId: string,
        @Body('history_id') historyId: string,
        @Body('directory_type') directoryType: DirectoryType,
    ) {
        console.log('update history');

        if (!historyId) {
            throw new NotFoundException('History id not found');
        }

        return this.historyService.updateHistoryList(userId, historyId, directoryType);
    }
}
