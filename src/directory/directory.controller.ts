import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryDocument, DirectoryType } from './directory.schema';

@Controller('directory')
export class DirectoryController {
    constructor(private readonly directoryService: DirectoryService) {}

    @Get()
    async getDirectories(
        @Query('parentID') parentID: string,
        @Query('search') search: string,
        @Query('type') type: DirectoryType,
        @Query('pagination') pagination: number,
        @Query('limit') limit: number,
    ) {
        if (!parentID || !type || !pagination) {
            throw new BadRequestException('Invalid query parameters');
        }

        return this.directoryService.getDirectories(parentID, type, search, { page: pagination, limit });
    }

    @Get(':directory_id')
    async getDirectory(@Param('directory_id') directory_id: string) {
        return this.directoryService.getDirectory(directory_id);
    }

    @Post()
    async createDirectory(@Body() newData: DirectoryDocument) {
        return this.directoryService.createDirectory(newData);
    }

    @Delete(':directory_id')
    async deleteDirectory(@Param('directory_id') directory_id: string) {

    }

    @Put(':directory_id')
    async updateDirectory(@Param('directory_id') directory_id: string, @Body() newData: DirectoryDocument) {
        return this.directoryService.updateDirectory(directory_id, newData);
    }
}